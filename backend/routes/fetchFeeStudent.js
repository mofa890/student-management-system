
// fetchFeeStudent.js ...api
// fetchFeeStudent.js ...api
const express = require('express');
const router = express.Router();
const Fee = require('../models/fee');
const authenticateToken = require('../middleware/authenticateToken');

// Fetch fee records for a specific student by custom student ID (stdId)
router.get('/:stdId', authenticateToken, async (req, res) => {
    const stdId = req.params.stdId;  // Custom student ID
    const userId = req.user._id;  // Get user ID from the authenticated token
    const { feeType } = req.query;  // Optional feeType query parameter

    try {
        // Build query based on whether feeType is provided
        const query = { stdId, userId };
        if (feeType) {
            query.feeType = feeType;
        }

        // Find fees by stdId, userId, and optional feeType, and populate student details
        const fees = await Fee.find(query).populate('student');
        
        if (fees.length === 0) {
            return res.status(404).json({ message: 'No fee records found for the given ID' });
        }
        
        res.status(200).json(fees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
