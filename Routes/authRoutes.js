const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/sign-up", authController.signUp);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);

router.post("/forget-password", authController.forgetPassword);
router.patch("/reset-password/:resetToken", authController.resetPassword);

module.exports = router;
