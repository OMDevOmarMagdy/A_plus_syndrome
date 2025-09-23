/**
 * @swagger
 * tags:
 *   name: Years
 *   description: Academic year management APIs
 */

/**
 * @swagger
 * /api/v1/years:
 *   get:
 *     summary: Get all years
 *     tags: [Years]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all years
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Year'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/years/{id}:
 *   get:
 *     summary: Get a single year by ID
 *     tags: [Years]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Year ID
 *     responses:
 *       200:
 *         description: Year details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Year'
 *       404:
 *         description: Year not found
 */

/**
 * @swagger
 * /api/v1/years:
 *   post:
 *     summary: Create a new year (Admin only)
 *     tags: [Years]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: First Year
 *     responses:
 *       201:
 *         description: Year created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Year'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/years/{id}:
 *   patch:
 *     summary: Update a year (Admin only)
 *     tags: [Years]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Year ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Year Name
 *     responses:
 *       200:
 *         description: Year updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Year'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Year not found
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/years/{id}:
 *   delete:
 *     summary: Delete a year (Admin only)
 *     tags: [Years]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Year ID
 *     responses:
 *       204:
 *         description: Year deleted successfully
 *       404:
 *         description: Year not found
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Year:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66d1a36f9a8b3c7a12d1b8e9
 *         name:
 *           type: string
 *           example: First Year
 *         createdAt:
 *           type: string
 *           example: 2025-09-23T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           example: 2025-09-23T12:30:00.000Z
 */
