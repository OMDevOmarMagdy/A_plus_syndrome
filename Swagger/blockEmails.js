/**
 * @swagger
 * tags:
 *   name: Blocked Emails
 *   description: Admin operations for managing blocked emails
 */

/**
 * @swagger
 * /api/v1/block-emails/block:
 *   post:
 *     summary: Block an email (add to block list and delete user if exists)
 *     tags: [Blocked Emails]
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
 *             properties:
 *               email:
 *                 type: string
 *                 example: "baduser@example.com"
 *     responses:
 *       201:
 *         description: Email blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email blocked successfully"
 *                 blocked:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f25c7d9b1d3f1234567890"
 *                     email:
 *                       type: string
 *                       example: "baduser@example.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Email already blocked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already blocked"
 *       500:
 *         description: Error blocking email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error blocking email"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/block-emails/unblock:
 *   delete:
 *     summary: Unblock an email (remove from block list)
 *     tags: [Blocked Emails]
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
 *             properties:
 *               email:
 *                 type: string
 *                 example: "baduser@example.com"
 *     responses:
 *       200:
 *         description: Email unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email unblocked successfully"
 *       404:
 *         description: Email not found in block list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email not found in block list"
 *       500:
 *         description: Error unblocking email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error unblocking email"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/block-emails:
 *   get:
 *     summary: Get all blocked emails
 *     tags: [Blocked Emails]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of blocked emails
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f25c7d9b1d3f1234567890"
 *                   email:
 *                     type: string
 *                     example: "baduser@example.com"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching blocked emails
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching blocked emails"
 *                 error:
 *                   type: string
 */
