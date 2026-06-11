
// addFeeRecord.js ......  api   

const express = require('express');
const UserMail=require('../models/email');
const router = express.Router();
const mongoose = require('mongoose');
const Fee = require('../models/fee');
const Student = require('../models/students');
const authenticateToken = require('../middleware/authenticateToken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const algorithm = 'aes-256-cbc';
const ivLength = 16; 
const iv = crypto.randomBytes(ivLength); 

// Add a fee record
router.post('/', authenticateToken, async (req, res) => {
    const { stdId, feeType, amount, paid, paymentDate } = req.body;
    const userId = req.user._id;  // Get user ID from authenticated token

    try {
        // Checking if the student with the given stdId exists
        const student = await Student.findOne({ id: stdId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Creates a new fee record
        const fee = new Fee({
            _id: new mongoose.Types.ObjectId(),
            stdId,
            student: student._id,  // Reference the actual student document
            userId,  // Link to the user who owns the record
            feeType,
            amount,
            paid,
            paymentDate
        });

       


        const savedFee = await fee.save();
  // Retrieve email credentials for the user
  const userMailRecord = await UserMail.findOne({ userId });
  if (!userMailRecord) {
      return res.status(400).json({ message: 'Email credentials not found for this user' });
  }

      const encryptedAppPass=userMailRecord.appPassword;  //getting encypted password successfully


// Decrypt function
function decrypt(encryptedText) {
    const [ivHex, encryptedData] = encryptedText.split(':');  // Split the IV and the encrypted text
    const iv = Buffer.from(ivHex, 'hex');  // Convert IV from hex to Buffer
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);  // Create the decipher object

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');  // Decrypt the data
    decrypted += decipher.final('utf8');  // Finalize decryption

    return decrypted;  // Return the decrypted data
}



// In API logic
    const decryptedPassword = decrypt(encryptedAppPass);
   
  

  // Set up Nodemailer transporter using user's credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: userMailRecord.email,            
          pass: decryptedPassword                
      }
  });

  // Define email options
  const mailOptions = {
      from: userMailRecord.email,
      to: student.email || 'lifezlifez3@gmail.com',
      subject: `Fee Payment Confirmation for ${feeType}`,
      text: `Dear ${student.studentName},\n\nWe have received your payment  for ${feeType} .\n\n 
      Amount:  ${amount} Rs\n Roll number:  ${student.id}\n\nThank you! \n Admission Date: ${student.admissionDate}\n\n\n\n\t\t\t\t Syan Coaching Center`  // Hear should be User's Institute name from db
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
          console.error('Error sending email:', err);
          return res.status(500).json({ message: 'Error sending email notification' });
      } else {
          console.log('Email sent successfully ! ');
          res.status(201).json(savedFee);
      }
  });


} catch (err) {
  res.status(500).json({ message: err.message });
}
});

module.exports = router;
