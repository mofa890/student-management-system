
// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);


        // Check if the token version matches
        if (user.tokenVersion !== decoded.tokenVersion) {
            return res.status(401).json({ message: 'Access denied. Token has expired.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
