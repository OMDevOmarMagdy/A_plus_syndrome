const express = require("express");
const {
  blockEmail,
  unblockEmail,
  getBlockedEmails,
} = require("../Controllers/blockedEmailController");
const { protect, restrictTo } = require("../Controllers/authController");

const router = express.Router();

// ✅ Admin only
router.post("/block", protect, restrictTo, blockEmail);
router.delete("/unblock", protect, restrictTo, unblockEmail);
router.get("/", protect, restrictTo, getBlockedEmails);

module.exports = router;
