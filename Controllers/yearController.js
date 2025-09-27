const Year = require("../models/yearModel");
const Module = require("../models/moduleModel");
const Subject = require("../models/subjectModel");
const Course = require("../models/courseModel");

const { deleteFileFromS3 } = require("../utils/s3Service"); // helper to delete files from S3

exports.getAllYears = async (req, res) => {
  try {
    const years = await Year.find();
    res.status(200).json({
      status: "success",
      results: years.length,
      data: {
        years,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getYearById = async (req, res) => {
  try {
    const year = await Year.findById(req.params.id);
    if (!year) {
      return res
        .status(404)
        .json({ status: "fail", message: "Year not found" });
    }
    res.status(200).json({
      status: "success",
      data: {
        year,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.createYear = async (req, res) => {
  try {
    const newYear = await Year.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newYear,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateYear = async (req, res) => {
  try {
    const updatedYear = await Year.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedYear) {
      return res
        .status(404)
        .json({ status: "fail", message: "Year not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedYear,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// exports.deleteYear = async (req, res) => {
//   try {
//     const deletedYear = await Year.findByIdAndDelete(req.params.id);
//     if (!deletedYear) {
//       return res
//         .status(404)
//         .json({ status: "fail", message: "Year not found" });
//     }

//     res.status(204).json({ status: "success", data: null });
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// };

exports.deleteYear = async (req, res) => {
  try {
    const yearId = req.params.id;

    // 🔹 Find all modules in this year
    const modules = await Module.find({ year_id: yearId });

    for (const module of modules) {
      // 🔹 Find all subjects in each module
      const subjects = await Subject.find({ module_id: module._id });

      for (const subject of subjects) {
        // 🔹 Find all courses in each subject
        const courses = await Course.find({ subject_id: subject._id });

        for (const course of courses) {
          // Delete course files from S3
          if (course.image && course.image !== "default-course.jpg") {
            await deleteFileFromS3(course.image);
          }
          for (const video of course.videos) {
            await deleteFileFromS3(video.fileKey);
          }

          // Delete course from DB
          await Course.findByIdAndDelete(course._id);
        }

        // Delete subject cover if exists
        if (subject.cover) {
          await deleteFileFromS3(subject.cover);
        }

        // Delete subject
        await Subject.findByIdAndDelete(subject._id);
      }

      // Delete module cover if exists
      if (module.cover) {
        await deleteFileFromS3(module.cover);
      }

      // Delete module
      await Module.findByIdAndDelete(module._id);
    }

    // 🔹 Finally delete the year
    const deletedYear = await Year.findByIdAndDelete(yearId);
    if (!deletedYear) {
      return res
        .status(404)
        .json({ status: "fail", message: "Year not found" });
    }

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
