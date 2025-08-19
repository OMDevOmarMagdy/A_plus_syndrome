/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 totalUsers:
 *                   type: integer
 *                   example: 10
 *                 results:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
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
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *               image:
 *                 type: string
 *                 example: profile.jpg
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Update a user (Admin & User)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Omar Updated
 *               email:
 *                 type: string
 *                 example: omarupdated@example.com
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: admin
 *               image:
 *                 type: string
 *                 example: newimage.jpg
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin & User)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66b8f36f9a8b3c7a12d1a7c5
 *         name:
 *           type: string
 *           example: Omar Magdy
 *         email:
 *           type: string
 *           example: omar@example.com
 *         role:
 *           type: string
 *           example: user
 *         image:
 *           type: string
 *           example: profile.jpg
 *         isVerified:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           example: 2025-08-11T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           example: 2025-08-11T12:00:00.000Z
 */


/**
 * @swagger
 * /api/v1/users/{id}/courses:
 *   get:
 *     summary: Get all courses for a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 66c1a45f9d12a2b3c4d5e6f7
 *     responses:
 *       200:
 *         description: List of courses for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66c1a46a1a23b4c5d6e7f8g9
 *                       title:
 *                         type: string
 *                         example: Learning Database from scratch
 *                       description:
 *                         type: string
 *                         example: you will learn everything about databases
 *                       instructor:
 *                         type: string
 *                         example: John Doe
 *                       price:
 *                         type: number
 *                         example: 119
 *                       duration:
 *                         type: string
 *                         example: "10 hours"
 *                       image:
 *                         type: string
 *                         example: course-image.jpg
 *                       category:
 *                         type: string
 *                         example: Programming
 *                       createdBy:
 *                         type: string
 *                         example: 66c1a45f9d12a2b3c4d5e6f7
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid request
 */
