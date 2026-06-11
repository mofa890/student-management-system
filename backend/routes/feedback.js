// routes/api/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

router.post('/', async (req, res) => {
    try {
        const { feedbackText } = req.body;

        if (!feedbackText) {
            return res.status(400).json({ message: 'Feedback text is required' });
        }

        const feedback = new Feedback({ feedbackText });
        await feedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
