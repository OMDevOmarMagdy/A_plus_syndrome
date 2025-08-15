// controllers/courseController.js
const Course = require("../models/courseModel");
const ActivityLog = require("../models/activityLogModel");

exports.addCourse = async (req, res, next) => {
  try {
    const { title, description, instructor, price, duration, image, category } =
      req.body;

    const course = await Course.create({
      title,
      description,
      instructor,
      price,
      duration,
      image,
      category,
      createdBy: req.user._id,
    });

    await ActivityLog.create({
      action: "ADD",
      description: `Course "${title}" was added`,
      user: req.user._id,
    });

    res.status(201).json({ message: "Course added successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await ActivityLog.create({
      action: "UPDATE",
      description: `Course "${course.title}" was updated`,
      user: req.user._id,
    });

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await ActivityLog.create({
      action: "DELETE",
      description: `Course "${course.title}" was deleted`,
      user: req.user._id,
    });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
