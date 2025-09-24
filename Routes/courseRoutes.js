// routes/courseRoutes.js
const express = require("express");
const { protect, restrictTo } = require("../Controllers/authController");
const {
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  openCourse,
  getCoursesBySubject,
} = require("../Controllers/courseController");

const upload = require("../utils/uploadWithMulter");
const router = express.Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    protect,
    restrictTo("admin"),
    upload.fields([
      { name: "image", maxCount: 1 }, // one image
      { name: "videos", maxCount: 10 }, // multiple videos
    ]),
    addCourse
  );
router.post("/open-course", protect, restrictTo("admin"), openCourse);
router.get("/subject/:subjectId", getCoursesBySubject);
router
  .route("/:id")
  .get(getCourseById)
  .patch(
    protect,
    restrictTo("admin"),
    upload.fields([
      { name: "image", maxCount: 1 }, // one image
      { name: "videos", maxCount: 10 }, // multiple videos
    ]),
    updateCourse
  )
  .delete(protect, restrictTo("admin"), deleteCourse);

module.exports = router;
