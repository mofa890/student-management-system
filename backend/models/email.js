
// api/models/email.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMailSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  appPassword: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
});

const UserMail = mongoose.model('UserMail', userMailSchema);
module.exports = UserMail;
