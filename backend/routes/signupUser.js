


// api/routes/sigupUser.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = require('./utills/generateToken');
require('dotenv').config();

const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    try {
        const { name, emailOrPhone, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ emailOrPhone });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or phone number already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            emailOrPhone,
            password: hashedPassword,
        });

        const result = await user.save();

        // Generate a token upon successful signup
        const token = generateToken(result); 

        res.status(201).json({
            message: 'User created successfully',
            user: result,
            token: token, 
        });
    } catch (err) {
        console.error('Error during signup:', err);
        
        // Handle duplicate key error explicitly
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email or phone number already exists' });
        }

        res.status(500).json({ message: 'Server error', error: err });
    }
});


module.exports = router;
