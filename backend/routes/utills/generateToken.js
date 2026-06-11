// utils/generateToken.js
const jwt = require('jsonwebtoken');

// Function to generate JWT token
function generateToken(user) {
    return jwt.sign(
        {
            userId: user._id,
            tokenVersion: user.tokenVersion, // Include token version in payload
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Adjust token expiration as needed
    );
}

module.exports = generateToken;