
// api/models/email.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMailSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  tokenScope: {
    type: String,
  },
  connectedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
    unique: true,
  },
});

const UserMail = mongoose.model('UserMail', userMailSchema);
module.exports = UserMail;
