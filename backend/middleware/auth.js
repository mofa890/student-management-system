
// api/middleware/auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');




const authenticateToken = (req, res, next) => {
  
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const decodedToken = jwt.decode(token);
    if (token == null) return res.sendStatus(401); // If no token, send 401

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, send 403
        req.user = user; // Add user info to req object
        next();
    });
};

module.exports = authenticateToken;



