

// notPaidAdmission.js

const express = require('express');
const router = express.Router();
const Fee = require('../models/fee');
const Student = require('../models/students');
const authenticateToken = require('../middleware/authenticateToken');

// Fetch records where admission fee is not paid or no fee record exists (for a specific user)
// Fetch records where admission fee is not paid or no fee record exists (for a specific user)
router.get('/admission', authenticateToken, async (req, res) => {
    const userId = req.user._id;  // Extract user ID from token
    const { page = 1, limit = 10 } = req.query; 

    try {
        // Step 1: Fetch all students associated with the user
        const students = await Student.find({ userId });

        // Step 2: Use Promise.all to check admission fees for all students concurrently
        const unpaidAdmissionFees = await Promise.all(students.map(async (student) => {
            const fee = await Fee.findOne({ student: student._id, feeType: 'Admission Fee', userId });

            if (!fee || fee.paid === false) {
                return {
                    stdId: student.id,  // Custom ID of the student
                    studentName: student.studentName,
                    amountDue: fee ? fee.amount : 'No admission fee record found',
                };
            }
            return null;
        }));

        // Filter out null results and return the list of unpaid admission fees
        const filteredUnpaidFees = unpaidAdmissionFees.filter(fee => fee !== null);

        // Get total count for pagination based on unpaid fees
        const total = filteredUnpaidFees.length;

        // Calculate total pages based on unpaid fees
        res.status(200).json({
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            unpaidAdmissionFees: filteredUnpaidFees.slice((page - 1) * limit, page * limit), // Paginate the unpaid fees
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
