
const express = require('express');
const router = express.Router();
const Student = require('../models/students');

// Check unique Enrollment Number
router.get('/',async (req, res) => {
    const { enrollmentNumber } = req.query;
    const student = await Student.findOne({ enrollmentNumber });
    res.json({ isUnique: !student });
  });

  
module.exports = router;