const express = require('express');
const crypto = require('crypto');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {
    const { emailOrPhone } = req.body;

    try {
        // Find the user by email or phone
        const user = await User.findOne({ emailOrPhone });
        if (!user) {
            return res.status(400).json({ message: 'User with this email or phone does not exist.' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = Date.now() + 600000; // Token expires in 10 minutes

        // Save the token and expiration time to the user's document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;
        await user.save();

        // Send the reset token via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'noreplyregister12@gmail.com',
                pass: 'sjxlwdenabhtsgnd',
            },
        });

        const mailOptions = {
            to: user.emailOrPhone, 
            from: 'noreplyregister12@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:3000/resetPassword/${resetToken}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset email has been sent.' });
    } catch (error) {
        console.error('Error occurred while processing the request: ', error);
        res.status(500).json({ message: 'Error occurred while processing the request.' });
    }
});

module.exports = router;
