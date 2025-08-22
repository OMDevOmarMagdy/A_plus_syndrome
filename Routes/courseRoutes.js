// routes/courseRoutes.js
const express = require("express");
const { protect } = require("../Controllers/authController");
const {
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  openCourse,
} = require("../Controllers/courseController");

const upload = require("../utils/uploadWithMulter");
const router = express.Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    protect,
    upload.fields([
      { name: "image", maxCount: 1 }, // one image
      { name: "videos", maxCount: 10 }, // multiple videos
    ]),
    addCourse
  );
router.post("/open-course", openCourse);

router
  .route("/:id")
  .get(getCourseById)
  .patch(
    protect,
    upload.fields([
      { name: "image", maxCount: 1 }, // one image
      { name: "videos", maxCount: 10 }, // multiple videos
    ]),
    updateCourse
  )
  .delete(protect, deleteCourse);

module.exports = router;
