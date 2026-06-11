// api/models/fee.js

const mongoose = require('mongoose');
const Student = require('../models/students'); // Reference to the student model
const User = require('../models/user'); // Reference to the user model
const { type } = require('@testing-library/user-event/dist/type');

const feeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stdId:{type:String, required:true},   // I want this id to be stored data and to get data 
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Reference to the Student model
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    feeType: { 
        type: String,
        enum: ['Admission Fee', 'Monthly Fee', 'Test/Entrance Fee'],
        required: true 
    },
    amount: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    paymentDate: { type: Date }
});

module.exports = mongoose.model('Fee', feeSchema);

