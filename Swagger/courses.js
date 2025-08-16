/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management APIs
 */

/**
 * @swagger
 * /api/v1/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - instructor
 *               - price
 *               - duration
 *               - createdBy
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mastering Node.js
 *               description:
 *                 type: string
 *                 example: Learn how to build backend applications with Node.js
 *               instructor:
 *                 type: string
 *                 example: Omar Magdy
 *               price:
 *                 type: number
 *                 example: 120
 *               duration:
 *                 type: string
 *                 example: 10 weeks
 *               image:
 *                 type: string
 *                 example: nodejs-course.jpg
 *               category:
 *                 type: string
 *                 enum: [Programming, Design, Marketing, Business, Other]
 *                 example: Programming
 *               createdBy:
 *                 type: string
 *                 example: 64e4b9d9c2a7e5a4b8a9f123
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Course Title
 *               description:
 *                 type: string
 *                 example: Updated description here
 *               instructor:
 *                 type: string
 *                 example: Updated Instructor
 *               price:
 *                 type: number
 *                 example: 150
 *               duration:
 *                 type: string
 *                 example: 12 weeks
 *               image:
 *                 type: string
 *                 example: updated-course.jpg
 *               category:
 *                 type: string
 *                 enum: [Programming, Design, Marketing, Business, Other]
 *                 example: Design
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Course not found
 *
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
