/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Academic subject management APIs
 */

/**
 * @swagger
 * /api/v1/subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subjects fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalSubjects:
 *                       type: integer
 *                       example: 2
 *                     subjects:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Subject'
 */

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subject fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     subject:
 *                       $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subject not found
 */

/**
 * @swagger
 * /api/v1/subjects/module/{moduleId}:
 *   get:
 *     summary: Get subjects by module
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The module ID
 *     responses:
 *       200:
 *         description: List of subjects for a given module
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subjects fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalSubjects:
 *                       type: integer
 *                       example: 3
 *                     subjects:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Subject'
 */

/**
 * @swagger
 * /api/v1/subjects:
 *   post:
 *     summary: Add a new subject (Admin only)
 *     tags: [Subjects]
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
 *               - module_name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Math Subject
 *               description:
 *                 type: string
 *                 example: Learn advanced math topics
 *               module_name:
 *                 type: string
 *                 example: Science Module
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: Subject cover image (uploaded to S3)
 *     responses:
 *       201:
 *         description: Subject created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subject created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     subject:
 *                       $ref: '#/components/schemas/Subject'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   patch:
 *     summary: Update a subject (Admin only)
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Subject Name
 *               description:
 *                 type: string
 *                 example: Updated description
 *               module_name:
 *                 type: string
 *                 example: Updated Module Name
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: New cover image (optional)
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subject updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     subject:
 *                       $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subject not found
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   delete:
 *     summary: Delete a subject (Admin only)
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       404:
 *         description: Subject not found
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66f6e4c2d6a8b3c7a12d1c9f1
 *         name:
 *           type: string
 *           example: Math Subject
 *         description:
 *           type: string
 *           example: Learn advanced math topics
 *         cover:
 *           type: string
 *           example: uploads/subject-cover.jpg
 *         module_id:
 *           type: string
 *           description: Reference to the module this subject belongs to
 *           example: 66f6e3a6d2a8b3c7a12d1b8e9
 *         createdAt:
 *           type: string
 *           example: 2025-09-23T13:00:00.000Z
 *         updatedAt:
 *           type: string
 *           example: 2025-09-23T13:30:00.000Z
 */
