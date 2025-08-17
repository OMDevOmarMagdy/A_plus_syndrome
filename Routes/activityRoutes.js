// routes/activityRoutes.js
const express = require("express");
const { protect } = require("../Controllers/authController");
const { getLastLogs } = require("../Controllers/activityController");
const router = express.Router();

router.get("/last", protect, getLastLogs);

module.exports = router;
