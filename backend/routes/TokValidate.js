// routes/TokValidate.js (example)
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Validate token route
router.get('/', authenticateToken, (req, res) => {
    // If the middleware passes, the token is valid
    res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;