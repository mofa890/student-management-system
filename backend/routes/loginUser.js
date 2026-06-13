
// // api/loginUser.js

const express = require('express');
const bcrypt = require('bcrypt');
const generateToken = require('./utills/generateToken'); // Import the utility function
require('dotenv').config();

const router = express.Router();
const User = require('../models/user');

router.post('/', (req, res) => {
    const { emailOrPhone, password} = req.body;  
  

    User.findOne({ emailOrPhone })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!user.password) {
                return res.status(401).json({ message: 'Please sign in with Google' });
            }
           

            // Compare the provided password with the hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: 'Error comparing passwords', error: err });
                }

                if (!isMatch) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                // Passwords match, proceed with generating the token
                const token = generateToken(user); 

                res.json({ token ,userId: user._id});
            });
        })
        .catch(err => {
            return res.status(500).json({ message: 'Server error', error: err });
        });
});

module.exports = router;
