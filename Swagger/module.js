/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Academic module management APIs
 */

/**
 * @swagger
 * /api/v1/modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: List of all modules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Modules fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 2
 *                     modules:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Module'
 *       404:
 *         description: No modules found
 */

/**
 * @swagger
 * /api/v1/modules/year/{yearId}:
 *   get:
 *     summary: Get modules by year
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: yearId
 *         required: true
 *         schema:
 *           type: string
 *         description: The year ID
 *     responses:
 *       200:
 *         description: List of modules for a given year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Modules by year fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 3
 *                     modules:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Module'
 */

/**
 * @swagger
 * /api/v1/modules:
 *   post:
 *     summary: Add a new module (Admin only)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - year_name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Database Module
 *               description:
 *                 type: string
 *                 example: Learn databases from scratch
 *               price:
 *                 type: number
 *                 example: 150
 *               year_name:
 *                 type: string
 *                 example: First Year
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: Module cover image (uploaded to S3)
 *     responses:
 *       201:
 *         description: Module added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Module added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     module:
 *                       $ref: '#/components/schemas/Module'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/modules/{id}:
 *   patch:
 *     summary: Update a module (Admin only)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Module Name
 *               description:
 *                 type: string
 *                 example: Updated description
 *               price:
 *                 type: number
 *                 example: 200
 *               year_name:
 *                 type: string
 *                 example: Second Year
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: New cover image (optional)
 *     responses:
 *       200:
 *         description: Module updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Module updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     module:
 *                       $ref: '#/components/schemas/Module'
 *       404:
 *         description: Module not found
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/modules/{id}:
 *   delete:
 *     summary: Delete a module (Admin only)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Module:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66d1b36f9a8b3c7a12d1c9f1
 *         name:
 *           type: string
 *           example: Database Module
 *         description:
 *           type: string
 *           example: Learn databases from scratch
 *         price:
 *           type: number
 *           example: 150
 *         cover:
 *           type: string
 *           example: uploads/module-cover.jpg
 *         year_id:
 *           type: string
 *           description: Reference to the year this module belongs to
 *           example: 66d1a36f9a8b3c7a12d1b8e9
 *         createdAt:
 *           type: string
 *           example: 2025-09-23T13:00:00.000Z
 *         updatedAt:
 *           type: string
 *           example: 2025-09-23T13:30:00.000Z
 *         subjects:
 *           type: array
 *           description: Subjects under this module
 *           items:
 *             type: string
 *             example: 66d1c36f9a8b3c7a12d1d1a2
 */
