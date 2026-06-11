
// api/routes/addEmail.js

const express = require('express');
const router = express.Router();
const UserMail = require('../models/email');
const crypto = require('crypto');

// Encryption configuration
const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');// 32 bytes
const ivLength = 16; // IV length for AES-256

// Encrypt function
function encrypt(text) {
    const iv = crypto.randomBytes(ivLength);  // Generate a new IV for each encryption
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;  // Return both IV and encrypted data
}

// Route to save email credentials /saveEmailCredentials
router.post('/', async (req, res) => {
    const { email, appPassword, userId } = req.body;
    // Encrypt the app password before storing
    const encryptedPassword = encrypt(appPassword);

    const newEmailCredential = new UserMail({
        email,
        appPassword: encryptedPassword,  // Store the encrypted password
        userId,  // Associate the credentials with the userId
    });

    try {
        await newEmailCredential.save();
        res.status(201).json({ message: 'Credentials saved successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving credentials' });
    }
});

module.exports = router;
