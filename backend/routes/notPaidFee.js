

// notPaidFee.js
const express = require('express');
const router = express.Router();
const Fee = require('../models/fee');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/fees', authenticateToken, async (req, res) => {
    const userId = req.user._id;  // User ID from token
    const { month, year, feeType, page = 1, limit = 10 } = req.query;

    try {
        const query = {
            userId: userId,
            ...(feeType && { feeType })
        };

        if (month && year) {
            const monthInt = parseInt(month);
            const yearInt = parseInt(year);
            query.$expr = {
                $and: [
                    { $eq: [{ $month: "$paymentDate" }, monthInt] },
                    { $eq: [{ $year: "$paymentDate" }, yearInt] }
                ]
            };
        }

        const skip = (page - 1) * limit;
        const feeRecords = await Fee.find(query).skip(skip).limit(parseInt(limit)).populate('student');
        const totalCount = await Fee.countDocuments(query); // For pagination

        res.status(200).json({
            feeRecords,
            totalPages: Math.ceil(totalCount / limit),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
