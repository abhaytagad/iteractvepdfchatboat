const mongoose = require('mongoose');
const mailSender = require('../util/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,   // ✅ function reference, not execution
    expires: 5 * 60,     // ✅ TTL: 5 minutes
  },
});

module.exports = mongoose.model("OTP", otpSchema);
