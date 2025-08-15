// routes/promoCodeRoutes.js
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createPromoCode } = require("../Controllers/promoCodeController");

const router = express.Router();

router.post("/", protect, createPromoCode);

module.exports = router;
