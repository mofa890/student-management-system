const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const path = require('path');

const router = express.Router();

// Serve the reset password form page
router.get('/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Find the user with the matching reset token and ensure it's not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).send('<h1>Password reset token is invalid or has expired.</h1>');
        }

        // Render the reset password form
        res.sendFile(path.join(__dirname, 'views', 'resetPasswordForm.html')); // Adjust path as needed
    } catch (error) {
        res.status(500).send('<h1>Error occurred while loading the password reset form.</h1>');
    }
});

// Handle password reset submission from the form
router.post('/:token', async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('<h1>Passwords do not match.</h1>');
    }

    try {
        // Find the user with the matching reset token and ensure it's not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).send('<h1>Password reset token is invalid or has expired.</h1>');
        }

        // Hash the new password and save it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
         // Invalidate all previous sessions by incrementing tokenVersion
         user.tokenVersion += 1;
        user.resetPasswordToken = undefined; // Remove the reset token
        user.resetPasswordExpires = undefined; // Remove the expiration time
        await user.save();

        res.send('<h1>Password has been reset successfully.</h1>');
    } catch (error) {
        res.status(500).send('<h1>Error occurred while resetting the password.</h1>');
    }
});


module.exports = router;
