/**
 * @swagger
 * tags:
 *   name: Blocked Emails
 *   description: Admin operations for managing blocked emails
 */

/**
 * @swagger
 * /block-emails/block:
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
 *       400:
 *         description: Email already blocked
 *       500:
 *         description: Error blocking email
 */

/**
 * @swagger
 * /block-emails/unblock:
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
 *       404:
 *         description: Email not found in block list
 *       500:
 *         description: Error unblocking email
 */

/**
 * @swagger
 * /block-emails:
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
 */
