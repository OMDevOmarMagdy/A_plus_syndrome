const BlockedEmail = require("../models/blockedEmailModel");
const User = require("../models/userModel");

// ✅ Add email to block list
exports.blockEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await BlockedEmail.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already blocked" });
    }

    const blocked = await BlockedEmail.create({ email });

    // Remove user if exists
    await User.deleteOne({ email });

    res.status(201).json({ message: "Email blocked successfully", blocked });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error blocking email", error: error.message });
  }
};

// ✅ Remove email from block list
exports.unblockEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const removed = await BlockedEmail.findOneAndDelete({ email });
    if (!removed) {
      return res.status(404).json({ message: "Email not found in block list" });
    }

    res.status(200).json({ message: "Email unblocked successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error unblocking email", error: error.message });
  }
};

// ✅ Get all blocked emails (for dashboard)
exports.getBlockedEmails = async (req, res) => {
  try {
    const blocked = await BlockedEmail.find();
    res.status(200).json(blocked);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blocked emails", error: error.message });
  }
};
