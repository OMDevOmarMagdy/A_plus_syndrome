const Course = require("../models/courseModel");
const Book = require("../models/bookModel");
const mime = require("mime-types");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../utils/s3");

// Upload a course image
exports.uploadCourseImage = async (req, res) => {
  try {
    const { courseId } = req.params;
    const fileKey = req.file.key;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    course.image = fileKey; // replace old image
    await course.save();

    res.json({
      message: "Course image uploaded successfully!",
      course,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Upload a course video
exports.uploadCourseVideo = async (req, res) => {
  try {
    const { courseId } = req.params;
    const fileKey = req.file.key;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    course.videos.push({ fileKey });
    await course.save();

    res.json({
      message: "Course video uploaded successfully!",
      course,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Upload a book photo
exports.uploadBookFile = async (req, res) => {
  try {
    const { bookId } = req.params; // book id from URL
    const fileKey = req.file.key;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    book.files.push({ fileKey });
    await book.save();

    res.json({
      message: "File uploaded and linked to book!",
      book,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Get signed URL for any file
exports.getURL = async (req, res) => {
  const fileKey = req.params.key;

  try {
    const contentType = mime.lookup(fileKey) || "application/octet-stream";

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      ResponseContentType: contentType,
      ResponseContentDisposition: "inline",
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.json({ url });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Could not generate file URL" });
  }
};
