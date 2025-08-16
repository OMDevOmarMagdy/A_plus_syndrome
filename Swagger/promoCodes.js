/**
 * @swagger
 * tags:
 *   name: PromoCodes
 *   description: Promo code management APIs
 */

/**
 * @swagger
 * /api/v1/promocodes:
 *   post:
 *     summary: Create a new promo code for a specific user
 *     tags: [PromoCodes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount
 *               - user
 *               - expiresAt
 *             properties:
 *               code:
 *                 type: string
 *                 example: WELCOME50
 *               discount:
 *                 type: number
 *                 example: 50
 *               user:
 *                 type: string
 *                 description: MongoDB ObjectId of the user who can use this promo code
 *                 example: 64e4b9d9c2a7e5a4b8a9f201
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-31T23:59:59.000Z
 *     responses:
 *       201:
 *         description: Promo code created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromoCode'
 *       400:
 *         description: Invalid input or promo code already exists
 */
