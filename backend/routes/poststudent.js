

// api/routes/poststudent.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/students');
const authenticateToken = require('../middleware/auth'); 
router.post('/', authenticateToken, (req, res, next) => {
    const { 
        id,  // Custom unique identifier for the student
        studentName, 
        fatherName, 
        motherName, 
        dob, 
        gender, 
        nationality, 
        admissionDate, 
        phone, 
        email, 
        address, 
        city, 
        state, 
        pincode, 
        previousSchool, 
        classAdmittedTo, 
        enrollmentNumber, 
        guardianName, 
        guardianPhone, 
        bloodGroup, 
        religion, 
        category, 
        medicalHistory 
    } = req.body;

    const userId = req.user.userId; // Get userId from authenticated user

    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        id,  // Custom unique student identifier
        studentName,
        fatherName,
        motherName,
        dob,
        gender,
        nationality,
        admissionDate,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        previousSchool,
        classAdmittedTo,
        enrollmentNumber,
        guardianName,
        guardianPhone,
        bloodGroup,
        religion,
        category,
        medicalHistory,
        userId // Use userId from authenticated user
    });

    student.save()
        .then(result => {
            res.status(201).json({
                message: "Student record created successfully",
                createdStudent: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;