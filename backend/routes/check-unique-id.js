
const express = require('express');
const router = express.Router();
const Student = require('../models/students');

// Check unique ID

router.get('/',async (req, res) => {
    const { id } = req.query;
    const student = await Student.findOne({ id });
    res.json({ isUnique: !student });
  });

  
module.exports = router;