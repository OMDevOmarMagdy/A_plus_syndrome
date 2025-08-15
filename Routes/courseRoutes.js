// routes/courseRoutes.js
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} = require("../Controllers/courseController");

const router = express.Router();

router.route("/").get(getAllCourses).post(protect, addCourse);

router
  .route("/:id")
  .get(getCourseById)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
