const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto-js");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The user must have a name"],
      trim: true, // To remove the space from begining and ending
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "The user must have an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "The user must have a password"],
      select: false,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default: "",
    },
    OTP: String,
    otpExpire: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
    resetTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.copmaredPassword = async function (pass1, pass2) {
  return await bcrypt.compare(pass1, pass2);
};

userSchema.methods.createResettoken = function () {
  const randomToken = crypto.lib.WordArray.random(16).toString(crypto.enc.Hex);
  console.log(`RandomToken before encrypted: ${randomToken}`);

  this.resetToken = crypto.SHA256(randomToken).toString(crypto.enc.Hex);
  this.resetTokenExpires = Date.now() + 10 * 60 * 1000;

  return randomToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
