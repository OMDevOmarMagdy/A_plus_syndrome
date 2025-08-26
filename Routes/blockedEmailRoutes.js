const express = require("express");
const {
  blockEmail,
  unblockEmail,
  getBlockedEmails,
} = require("../Controllers/blockedEmailController");
const { protect, restrictTo } = require("../Controllers/authController");

const router = express.Router();

// ✅ Admin only
router.post("/block", protect, restrictTo("admin"), blockEmail);
router.delete("/unblock", protect, restrictTo("admin"), unblockEmail);
router.get("/", protect, restrictTo("admin"), getBlockedEmails);

module.exports = router;
