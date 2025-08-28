const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  OTP: String,
  otpExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // 600 seconds = 10 minutes
  },
});

const TempUser = mongoose.model("TempUser", tempUserSchema);
module.exports = TempUser;
