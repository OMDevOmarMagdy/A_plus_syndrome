const express = require("express");
const uploadWithMulter = require("../utils/uploadWithMulter");
const uploadController = require("../Controllers/uploadController");

const router = express.Router();

// Upload course image
router.post(
  "/course/:courseId/image",
  uploadWithMulter.single("file"),
  uploadController.uploadCourseImage
);

// Upload course video
router.post(
  "/course/:courseId/video",
  uploadWithMulter.single("file"),
  uploadController.uploadCourseVideo
);

// Upload file to a specific book
router.post(
  "/book/:bookId",
  uploadWithMulter.single("file"),
  uploadController.uploadBookFile
);

// Get signed URL for file
router.get("/file/:key", uploadController.getURL);

module.exports = router;
