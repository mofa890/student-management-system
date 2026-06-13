const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const generateToken = require('./utills/generateToken');
const User = require('../models/user');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const router = express.Router();

const requiredEnvVars = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_CALLBACK_URL',
    'FRONTEND_URL',
];

const isGoogleAuthConfigured = () => requiredEnvVars.every((key) => Boolean(process.env[key]));

if (isGoogleAuthConfigured()) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails?.[0]?.value;

                    if (!email) {
                        return done(new Error('Google account does not provide an email address'));
                    }

                    let user = await User.findOne({ googleId: profile.id });

                    if (!user) {
                        user = await User.findOne({ emailOrPhone: email });
                    }

                    if (user) {
                        user.googleId = user.googleId || profile.id;
                        user.authProvider = user.authProvider === 'local' ? 'local' : 'google';
                        await user.save();
                    } else {
                        user = await User.create({
                            _id: new mongoose.Types.ObjectId(),
                            name: profile.displayName || email,
                            emailOrPhone: email,
                            googleId: profile.id,
                            authProvider: 'google',
                        });
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
}

router.get('/google', (req, res, next) => {
    if (!isGoogleAuthConfigured()) {
        return res.status(500).json({
            message: 'Google OAuth is not configured on the server',
        });
    }

    return passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    })(req, res, next);
});

router.get(
    '/google/callback',
    (req, res, next) => {
        if (!isGoogleAuthConfigured()) {
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/oauth/callback?error=oauth_not_configured`);
        }

        return passport.authenticate('google', {
            failureRedirect: `${process.env.FRONTEND_URL}/oauth/callback?error=google_auth_failed`,
            session: false,
        })(req, res, next);
    },
    (req, res) => {
        const token = generateToken(req.user);
        const redirectUrl = new URL('/oauth/callback', process.env.FRONTEND_URL);

        redirectUrl.searchParams.set('token', token);
        redirectUrl.searchParams.set('userId', req.user._id.toString());

        res.redirect(redirectUrl.toString());
    }
);

module.exports = router;
