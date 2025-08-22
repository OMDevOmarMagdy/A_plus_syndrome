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
 *     summary: Create a new course (with image + videos)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - instructor
 *               - price
 *               - duration
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
 *               category:
 *                 type: string
 *                 enum: [Programming, Design, Marketing, Business, Other]
 *                 example: Programming
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Upload a single course cover image
 *               videos:
 *                 type: array
 *                 description: Upload one or more course videos
 *                 items:
 *                   type: string
 *                   format: binary
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
 *   patch:
 *     summary: Update a course by ID (with image + videos)
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
 *         multipart/form-data:
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
 *               category:
 *                 type: string
 *                 enum: [Programming, Design, Marketing, Business, Other]
 *                 example: Design
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Upload a new course cover image
 *               videos:
 *                 type: array
 *                 description: Upload one or more new course videos (they will be appended)
 *                 items:
 *                   type: string
 *                   format: binary
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

/**
 * @swagger
 * /api/v1/courses/open-course:
 *   post:
 *     summary: Unlock a course for a user by email and course name
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - courseName
 *             properties:
 *               email:
 *                 type: string
 *                 example: student@example.com
 *               courseName:
 *                 type: string
 *                 example: JavaScript Basics
 *     responses:
 *       200:
 *         description: Course unlocked successfully
 *       404:
 *         description: User or Course not found
 *       500:
 *         description: Something went wrong
 */
