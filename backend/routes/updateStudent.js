
// api/routes/updateStudent.js
const express = require('express');
const router = express.Router();
const Student = require('../models/students');
const authenticateToken = require('../middleware/auth'); // Import the authentication middleware

// Apply the authenticateToken middleware
router.put('/:id', authenticateToken, (req, res, next) => {
    const studentId = req.params.id;
    const updatedData = req.body;

    // Ensure userId is available
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.userId; // Get userId from req.user

    Student.findOneAndUpdate(
        { _id: studentId, userId: userId }, // Ensure the student belongs to the user
        updatedData,
        { new: true }
    )
        .then(updatedStudent => {
            if (!updatedStudent) {
                return res.status(404).json({ message: 'Student not found or not authorized' });
            }
            res.status(200).json({ student: updatedStudent });
        })
        .catch(err => {
           
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;

