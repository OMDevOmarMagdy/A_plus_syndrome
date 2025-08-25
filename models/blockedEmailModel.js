const mongoose = require("mongoose");

const blockedEmailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlockedEmail", blockedEmailSchema);
