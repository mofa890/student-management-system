
// api/getStudents.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); // Import the middleware
const Student = require('../models/students');

// Route to get students with pagination
router.get('/', authenticateToken, (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    Student.find({ userId: req.user.userId })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .then(students => {
        Student.countDocuments({ userId: req.user.userId }).then(total => {
            if (students.length === 0) {
                return res.status(404).json({ message: 'No students found for this user' });
            }
            res.json({ students, total });
        });
    })
    .catch(err => {
        console.error('Database Fetch Error:', err);
        res.status(500).json({ message: 'Failed to fetch students', error: err.message });
    });


});


// GET request to fetch a student by custom ID, ensuring user authorization
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        // Find the student by custom ID and also ensure the userId matches the authenticated user
        const student = await Student.findOne({ id: req.params.id, userId: req.user.userId });

        if (!student) {
            return res.status(404).json({ message: 'Student not found or unauthorized access' });
        }

        res.status(200).json(student);
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;