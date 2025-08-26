const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  OTP: String,
  otpExpire: Date,
});

const TempUser = mongoose.model("TempUser", tempUserSchema);
module.exports = TempUser;
