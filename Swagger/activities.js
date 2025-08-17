/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: API to track and fetch user activities
 */

/**
 * @swagger
 * /api/v1/activity/last:
 *   get:
 *     summary: Get the last logged action for each type (book, course, promoCode)
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved last activity logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         enum: [course, book, promoCode]
 *                         example: course
 *                       action:
 *                         type: string
 *                         enum: [ADD, UPDATE, DELETE, PROMO_CODE]
 *                         example: ADD
 *                       description:
 *                         type: string
 *                         example: "New course added: Algebra 101"
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64f123abc456def7890a1b23"
 *                           name:
 *                             type: string
 *                             example: "Omar Magdy"
 *                           email:
 *                             type: string
 *                             example: "omar@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-17T12:34:56.789Z"
 *       401:
 *         description: Unauthorized - if no valid token is provided
 *       500:
 *         description: Internal server error
 */
