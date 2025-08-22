/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API for uploading and retrieving files for courses and books
 */

/**
 * @swagger
 * /api/v1/upload/files/course/{courseId}/image:
 *   post:
 *     summary: Upload an image for a specific course
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *         example: 64f123abc456def7890a1b23
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully and linked to course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Course image uploaded successfully
 *                 fileKey:
 *                   type: string
 *                   example: "courses/64f123abc456def7890a1b23/course-image.jpg"
 *       400:
 *         description: Bad request - invalid file or course not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/upload/files/course/{courseId}/video:
 *   post:
 *     summary: Upload a video for a specific course
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *         example: 64f123abc456def7890a1b23
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video uploaded successfully and linked to course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Course video uploaded successfully
 *                 fileKey:
 *                   type: string
 *                   example: "courses/64f123abc456def7890a1b23/lesson1.mp4"
 *       400:
 *         description: Bad request - invalid file or course not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/upload/files/book/{bookId}:
 *   post:
 *     summary: Upload a file for a specific book
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *         example: 64f456abc123def7890a1b45
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully and linked to book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book file uploaded successfully
 *                 fileKey:
 *                   type: string
 *                   example: "books/64f456abc123def7890a1b45/book.pdf"
 *       400:
 *         description: Bad request - invalid file or book not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/upload/file/{key}:
 *   get:
 *     summary: Get signed URL to access a file from S3
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: File key in S3
 *         example: "courses/64f123abc456def7890a1b23/lesson1.mp4"
 *     responses:
 *       200:
 *         description: Successfully retrieved signed URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://s3.amazonaws.com/mybucket/courses/64f123abc456def7890a1b23/lesson1.mp4?AWSAccessKeyId=..."
 *       400:
 *         description: Invalid key
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
