

// api/routes/fees.js

const express = require('express');
const router = express.Router();
const Fee = require('../models/fee');

const authenticateToken = require('../middleware/authenticateToken');
const { findOne } = require('../models/email');

// Fetch all fee records for the authenticated user, with optional feeType filter and pagination
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const feeType = req.query.feeType;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let query = { userId };
   

    if (feeType) {
        query.feeType = feeType;
    }

    try {
        const totalRecords = await Fee.countDocuments(query); // Count total records for pagination
        const feeRecords = await Fee.find(query)
            .skip((page - 1) * limit) // Skip documents for pagination
            .limit(limit) // Limit results per page
            .populate('student');  // Populate student details

        const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages
        res.status(200).json({ feeRecords, totalPages });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching fees', error: err });
    }
});


module.exports = router;
