
//api/routes/filterStudents.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Student = require('../models/students');

// Filter API route with corrected admissionYear filtering
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { classAdmittedTo, admissionYear, searchId, searchName, page = 1, limit = 10 } = req.query;
        const userId = req.user.userId;

        let query = { userId };

        // Add class filter if provided
        if (classAdmittedTo) {
            query.classAdmittedTo = classAdmittedTo;
        }

        // Correctly handle admission year as date range
        if (admissionYear) {
            const yearStart = new Date(`${admissionYear}-01-01T00:00:00.000Z`);
            const yearEnd = new Date(`${admissionYear}-12-31T23:59:59.999Z`);
            query.admissionDate = { $gte: yearStart, $lte: yearEnd };
        }

        // Add search by ID if provided
        if (searchId) {
            query.id = searchId;
        }

        // Add search by name if provided
        if (searchName) {
            query.studentName = { $regex: searchName, $options: 'i' };
        }

        // Implement pagination with skip and limit
        const skip = (page - 1) * limit;
        const students = await Student.find(query).skip(skip).limit(parseInt(limit));
        const totalStudents = await Student.countDocuments(query); // Total number of filtered students

        if (students.length > 0) {
            res.status(200).json({
                students,
                total: totalStudents
            });
        } else {
            res.status(404).json({ message: 'No students found' });
        }
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ message: 'Error fetching students' });
    }
});



module.exports = router;


// //api/routes/filterStudents.js

// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('../middleware/auth'); // Import the middleware
// const Student = require('../models/students');

// // Fetch students based on filters and search criteria with pagination
// router.get('/', authenticateToken, async (req, res) => {
//     try {
//         const { classAdmittedTo, admissionYear, searchId, searchName, page = 1, limit = 10 } = req.query;
//         const userId = req.user.userId; // Authorized user
        
//         let query = { userId };

//         if (classAdmittedTo) {
//             query.classAdmittedTo = classAdmittedTo;
//         }
        
//         if (admissionYear) {
//             const start = new Date(`${admissionYear}-01-01`);
//             const end = new Date(`${admissionYear}-12-31`);
//             query.admissionDate = { $gte: start, $lte: end };
//         }

//         if (searchId) {
//             query.id = searchId;
//         }

//         if (searchName) {
//             query.studentName = { $regex: searchName, $options: 'i' };
//         }

//         // Fetch paginated results
//         const students = await Student.find(query)
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));
        
//         // Count total number of matching records
//         const total = await Student.countDocuments(query);

//         if (students.length > 0) {
//             res.status(200).json({ students, total });
//         } else {
//             res.status(404).json({ message: 'No students found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching students' });
//     }
// });

// module.exports = router;
