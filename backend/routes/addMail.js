// api/routes/addMail.js

const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const User = require('../models/user');
const UserMail = require('../models/email');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

const algorithm = 'aes-256-cbc';
const ivLength = 16;

function getSecretKey() {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY is required');
    }

    return Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
}

function encrypt(text) {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, getSecretKey(), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

function getOAuthClient() {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_MAIL_CALLBACK_URL || process.env.GOOGLE_CALLBACK_URL
    );
}

function getFrontendUrl(path) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return new URL(path, frontendUrl).toString();
}

function validateGoogleMailConfig() {
    return Boolean(
        process.env.GOOGLE_CLIENT_ID &&
        process.env.GOOGLE_CLIENT_SECRET &&
        (process.env.GOOGLE_MAIL_CALLBACK_URL || process.env.GOOGLE_CALLBACK_URL)
    );
}

async function getUserFromToken(token) {
    if (!token) {
        return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.tokenVersion !== decoded.tokenVersion) {
        return null;
    }

    return user;
}

// Check whether the logged-in user has connected Gmail for receipts.
router.get('/status', authenticateToken, async (req, res) => {
    try {
        const userMail = await UserMail.findOne({ userId: req.user._id }).select('email connectedAt');

        res.status(200).json({
            connected: Boolean(userMail),
            email: userMail?.email || null,
            connectedAt: userMail?.connectedAt || null,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error checking Gmail connection' });
    }
});

// Start Google OAuth consent for Gmail sending permission.
router.get('/google', async (req, res) => {
    if (!validateGoogleMailConfig()) {
        return res.status(500).json({ message: 'Google mail OAuth is not configured' });
    }

    try {
        const authHeader = req.header('Authorization');
        const token = req.query.token || authHeader?.replace('Bearer ', '');
        const user = await getUserFromToken(token);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const oauth2Client = getOAuthClient();
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            state: token,
            scope: [
                'https://www.googleapis.com/auth/gmail.send',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
            ],
        });

        return res.redirect(url);
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

// Google redirects here after the user grants Gmail send permission.
router.get('/google/callback', async (req, res) => {
    const { code, state } = req.query;
    const failureUrl = getFrontendUrl('/register/EmailCredentialForm?connected=failed');

    if (!code || !state || !validateGoogleMailConfig()) {
        return res.redirect(failureUrl);
    }

    try {
        const user = await getUserFromToken(state);

        if (!user) {
            return res.redirect(failureUrl);
        }

        const oauth2Client = getOAuthClient();
        const { tokens } = await oauth2Client.getToken(code);

        if (!tokens.refresh_token) {
            return res.redirect(getFrontendUrl('/register/EmailCredentialForm?connected=no_refresh_token'));
        }

        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });
        const profile = await oauth2.userinfo.get();

        await UserMail.findOneAndUpdate(
            { userId: user._id },
            {
                email: profile.data.email,
                googleId: profile.data.id,
                refreshToken: encrypt(tokens.refresh_token),
                tokenScope: tokens.scope,
                connectedAt: new Date(),
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.redirect(getFrontendUrl('/register/EmailCredentialForm?connected=success'));
    } catch (err) {
        console.error('Error connecting Gmail:', err);
        return res.redirect(failureUrl);
    }
});

// Disconnect Gmail receipt sending for the logged-in user.
router.delete('/', authenticateToken, async (req, res) => {
    try {
        await UserMail.deleteOne({ userId: req.user._id });
        res.status(200).json({ message: 'Gmail disconnected successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error disconnecting Gmail' });
    }
});

router.post('/', (req, res) => {
    res.status(410).json({
        message: 'Password-based email credentials have been replaced by Google OAuth.',
    });
});

module.exports = router;
