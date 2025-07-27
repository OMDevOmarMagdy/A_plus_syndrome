const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/signUp:
 *   post:
 *     summary: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Omar Magdy
 *               email:
 *                 type: string
 *                 example: omar@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or user already exists
 */

/**
 * @swagger
 * /api/v1/auth/verify:
 *   post:
 *     summary: Verify user account using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - OTP
 *             properties:
 *               email:
 *                 type: string
 *                 example: omar@example.com
 *               OTP:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: omar@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login successful, returns access token
 *       401:
 *         description: Unauthorized - wrong credentials
 */

router.post("/signUp", authController.signUp);
router.post("/verify", authController.verifyOTP);
router.post("/login", authController.login);

router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:resetToken", authController.resetPassword);

module.exports = router;
