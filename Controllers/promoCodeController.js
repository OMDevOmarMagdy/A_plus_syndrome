// controllers/promoCodeController.js
const PromoCode = require("../models/promoCodeModel");
const ActivityLog = require("../models/activityLogModel");
const User = require("../models/userModel");

function generateRandomCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

exports.createPromoCode = async (req, res) => {
  try {
    const { discount, userId } = req.body;
    const code = generateRandomCode(8);
    const expiresAt = Date.now() + 10 * 60 * 1000;

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const promo = await PromoCode.create({
      code,
      discount,
      user: userId,
      expiresAt,
    });

    await ActivityLog.create({
      action: "PROMO_CODE",
      description: `Promo code "${code}" created for user ${targetUser.name}`,
      user: userId,
      type: "promoCode",
    });

    res.status(201).json({ message: "Promo code created successfully", promo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
