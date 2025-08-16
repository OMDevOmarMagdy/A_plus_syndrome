/**
 * @swagger
 * tags:
 *   name: All
 *   description: API to fetch all collections data together
 */

/**
 * @swagger
 * /api/v1/all:
 *   get:
 *     summary: Get all users, books, promo codes, and courses
 *     tags: [All]
 *     responses:
 *       200:
 *         description: Successfully retrieved all data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 totalUsers:
 *                   type: number
 *                   example: 12
 *                 totalBooks:
 *                   type: number
 *                   example: 8
 *                 totalPromoCodes:
 *                   type: number
 *                   example: 5
 *                 totalCourses:
 *                   type: number
 *                   example: 10
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
 *                     promocodes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PromoCode'
 *                     courses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Course'
 *       404:
 *         description: Not found - if any collection is missing
 */
