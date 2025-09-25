const Course = require("../models/courseModel");
const ActivityLog = require("../models/activityLogModel");
const UserCourse = require("../models/userCourseModel");
const User = require("../models/userModel");
const Subject = require("../models/subjectModel");

const s3 = require("../utils/s3");
const {
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");

exports.addCourse = async (req, res, next) => {
  try {
    // Handle image (single file)
    const image = req.files?.image
      ? req.files.image[0].key
      : "default-course.jpg";

    // Handle videos (multiple files -> map into objects)
    const videos = req.files?.videos
      ? req.files.videos.map((file) => ({
          fileKey: file.key,
          uploadedAt: new Date(),
        }))
      : [];

    const { title, description, price, subject_name } = req.body;

    const subject = await Subject.findOne({ name: subject_name });
    if (!subject) {
      return res.status(404).json({
        status: "error",
        message: "This subject not exist",
      });
    }
    // console.log(subject);

    const course = await Course.create({
      title,
      description,
      price,
      image,
      videos, // ✅ structured video objects
      createdBy: req.user._id,
      subject_id: subject._id,
    });

    await ActivityLog.create({
      action: "ADD",
      description: `Course "${course.title}" was added`,
      user: req.user._id,
      type: "course",
    });

    res.status(201).json({
      message: "Course added successfully",
      data: { course },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Handle image update (if new image uploaded)
    if (req.files?.image) {
      updates.image = req.files.image[0].key;
    }

    // Handle videos update (if new videos uploaded → append)
    let newVideos = [];
    if (req.files?.videos) {
      newVideos = req.files.videos.map((file) => ({
        fileKey: file.key,
        uploadedAt: new Date(),
      }));
    }

    if (updates.subject_name) {
      const subject = await Subject.findOne({ name: subject_name });
      if (!subject) {
        return res.status(404).json({
          status: "error",
          message: "This subject not exist",
        });
      }
      console.log(subject);

      updates.subject_id = subject._id;
      delete updates.subject_name;
    }

    // Fetch course
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Apply updates
    Object.assign(course, updates);

    // Append new videos if any
    if (newVideos.length > 0) {
      course.videos.push(...newVideos);
    }

    await course.save();

    await ActivityLog.create({
      action: "UPDATE",
      description: `Course "${course.title}" was updated`,
      user: req.user._id,
      type: "course",
    });

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ delete course image (if not default)
    if (course.image && course.image !== "default-course.jpg") {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: course.image,
        })
      );
    }

    // ✅ delete all videos
    if (course.videos && course.videos.length > 0) {
      const objectsToDelete = course.videos.map((v) => ({ Key: v.fileKey }));
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Delete: { Objects: objectsToDelete },
        })
      );
    }

    // finally delete from DB
    await Course.findByIdAndDelete(req.params.id);

    await ActivityLog.create({
      action: "DELETE",
      description: `Course "${course.title}" was deleted`,
      user: req.user._id,
      type: "course",
    });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting course:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email");
    res.status(200).json({ message: "Success", data: { courses } });
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

    res.status(200).json({ message: "Success", data: { course } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.openCourse = async (req, res, next) => {
  try {
    const { email, courseName } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find course by name
    const course = await Course.findOne({ title: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if record exists
    let userCourse = await UserCourse.findOne({
      userId: user._id,
      courseId: course._id,
    });
    if (userCourse) {
      userCourse.status = "active"; // Reactivate
      await userCourse.save();
    } else {
      userCourse = await UserCourse.create({
        userId: user._id,
        courseId: course._id,
        status: "active",
      });
    }

    // Add this course to user courses --> paid
    if (!user.courses.includes(course._id)) {
      user.courses.push(course._id);
      user.save();
    }

    res.json({
      message: `✅ Course "${course.title}" unlocked for user ${user.email}`,
      userCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// ✅ Get courses by Subject ID
exports.getCoursesBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const courses = await Course.find({ subject_id: subjectId })
      .populate("createdBy", "name email")
      .populate("subject_id", "name description");

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this subject" });
    }

    res.status(200).json({
      message: "Courses fetched successfully",
      data: {
        totalCourses: courses.length,
        courses,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
