

 //   api/models/student.js         this model is to take admisssion and filling form
const mongoose = require('mongoose');
const User = require('../models/user');

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String, unique: true, required: true },  // Custom unique identifier for the student ,this is for matching stdId
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },  // Father's Name
    motherName: { type: String, required: true },  // Mother's Name
    dob: { type: Date, required: true },  // Date of Birth
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },  // Gender
    nationality: { type: String, required: true },  // Nationality
    admissionDate: { type: Date, required: true },  // Admission Date
    phone: { type: String, required: true },  // Contact Number
    email: { type: String },  // Email Address
    address: { type: String, required: true },  // Residential Address
    city: { type: String, required: true },  // City
    state: { type: String, required: true },  // State
    pincode: { type: String, required: true },  // Postal Code
    previousSchool: { type: String },  // Previous School Name (if applicable)
    classAdmittedTo: { type: String, required: true },  // Class admitted to (e.g., 10th grade, 1st semester, etc.)
    enrollmentNumber: { type: String, unique: true },  // Enrollment Number
    guardianName: { type: String },  // Guardian Name (if different from parents)
    guardianPhone: { type: String },  // Guardian Contact Number
    bloodGroup: { type: String },  // Blood Group
    religion: { type: String },  // Religion (optional)
    category: { type: String, enum: ['General', 'OBC', 'SC', 'ST', 'Other'] },  // Category (General, OBC, SC, ST)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
});

module.exports = mongoose.model('Student', studentSchema);

