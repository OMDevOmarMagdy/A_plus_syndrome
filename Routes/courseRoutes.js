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

const router = express.Router();

router.route("/").get(getAllCourses).post(protect, addCourse);
router.post("/open-course", openCourse);

router
  .route("/:id")
  .get(getCourseById)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
