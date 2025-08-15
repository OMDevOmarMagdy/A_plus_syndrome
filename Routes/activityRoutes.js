// routes/activityRoutes.js
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getLastActivities } = require("../Controllers/activityController");

const router = express.Router();

router.get("/last", protect, getLastActivities);

module.exports = router;
