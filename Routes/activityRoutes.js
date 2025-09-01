// routes/activityRoutes.js
const express = require("express");
const { protect, restrictTo } = require("../Controllers/authController");
const { getLastLogs } = require("../Controllers/activityController");
const router = express.Router();

router.get("/last", protect, restrictTo("admin"), getLastLogs);

module.exports = router;
