
// This API is not in use anywhere right now in this project 

const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoose = require('mongoose');

const router = express.Router();

let otpStorage = {}; // Store OTP temporarily

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, emailOrPhone, password, otp } = req.body;

        // Check if OTP is correct and not expired
        if (!otpStorage[emailOrPhone] || otpStorage[emailOrPhone].otp !== otp || otpStorage[emailOrPhone].expires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            emailOrPhone,
            password: hashedPassword
        });

        const result = await user.save();

        // Generate a token upon successful signup
        const payload = { userId: result._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Clear OTP from storage after successful verification
        delete otpStorage[emailOrPhone];

        res.status(201).json({
            message: 'User created successfully',
            user: result,
            token: token
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
