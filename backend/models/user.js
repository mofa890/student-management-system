
//   api/models/user.js ...    for new user signup in website

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    emailOrPhone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //Fields for password reset
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    tokenVersion: {
        type: Number,
        default: 0, // Default value for the initial version
    },
  
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;


