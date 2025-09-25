// controllers/subjectController.js
const Subject = require("../models/subjectModel");
const ActivityLog = require("../models/activityLogModel");
const Module = require("../models/moduleModel");
const UserSubject = require("../models/userSubjectModel");
const User = require("../models/userModel");

const s3 = require("../utils/s3");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

const getModuleId = async (res, module_name) => {
  const module = await Module.findOne({ name: module_name });
  if (!module) {
    return res.status(404).json({
      status: "error",
      message: "NO module founded",
    });
  }
  return module._id;
};

// ========================
//   Subject Controller
// ========================

exports.createSubject = async (req, res, next) => {
  try {
    const { name, description, module_name } = req.body;
    const cover = req.file ? req.file.key : null; // uploaded to S3
    const moduleId = await getModuleId(res, module_name);

    // console.log(
    //   "cover: ",
    //   cover,
    //   " ",
    //   "name: ",
    //   name,
    //   "Module name: ",
    //   module_name
    // );

    if (!name || !module_name) {
      return res.status(400).json({ message: "Name and Module are required" });
    }

    const subject = await Subject.create({
      name,
      description,
      cover,
      module_id: moduleId,
    });

    // // Log activity
    // await ActivityLog.create({
    //   action: "ADD",
    //   description: `Subject "${subject.name}" was added`,
    //   user: req.user ? req.user._id : null,
    //   type: "subject",
    // });

    res.status(201).json({
      message: "Subject created successfully",
      data: {
        subject,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find().populate("module_id", "name");

    res.status(200).json({
      message: "Subjects fetched successfully",
      data: {
        totalSubjects: subjects.length,
        subjects,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getSubjectById = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id).populate(
      "module_id",
      "name"
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({
      message: "Subject fetched successfully",
      data: {
        subject,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSubject = async (req, res, next) => {
  try {
    const subjectId = req.params.id;
    const { name, description, module_name } = req.body;
    const cover = req.file ? req.file.key : undefined;

    let moduleId = "";
    if (module_name) {
      moduleId = await getModuleId(res, module_name);
      console.log(moduleId);
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (moduleId) updateData.module_id = moduleId;
    if (cover) updateData.cover = cover;

    const oldSubject = await Subject.findById(subjectId);
    if (!oldSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // delete old cover if new one uploaded
    if (cover && oldSubject.cover) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: oldSubject.cover,
        })
      );
    }

    const subject = await Subject.findByIdAndUpdate(subjectId, updateData, {
      new: true,
      runValidators: true,
    });

    // // Log activity
    // await ActivityLog.create({
    //   action: "UPDATE",
    //   description: `Subject "${subject.name}" was updated`,
    //   user: req.user ? req.user._id : null,
    //   type: "subject",
    // });

    res.status(200).json({
      message: "Subject updated successfully",
      data: {
        subject,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    const subjectId = req.params.id;
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // delete cover if exists
    if (subject.cover) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: subject.cover,
        })
      );
    }

    await Subject.findByIdAndDelete(subjectId);

    // // Log activity
    // await ActivityLog.create({
    //   action: "DELETE",
    //   description: `Subject "${subject.name}" was deleted`,
    //   user: req.user ? req.user._id : null,
    //   type: "subject",
    // });

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.openSubject = async (req, res, next) => {
  try {
    const { email, subjectName } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find subject by name
    const subject = await Subject.findOne({ name: subjectName });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Check if record exists in UserSubject
    let userSubject = await UserSubject.findOne({
      userId: user._id,
      subjectId: subject._id,
    });

    if (userSubject) {
      userSubject.status = "active"; // Reactivate if previously inactive
      await userSubject.save();
    } else {
      userSubject = await UserSubject.create({
        userId: user._id,
        subjectId: subject._id,
        status: "active",
      });
    }

    // Add this subject to user's subjects array (if you track it inside User)
    if (!user.subjects.includes(subject._id)) {
      user.subjects.push(subject._id);
      await user.save();
    }

    res.json({
      message: `Subject "${subject.name}" unlocked for user ${user.email}`,
      data: {
        userSubject,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get subjects by Module ID
exports.getSubjectsByModule = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ module_id: req.params.moduleId });

    res.status(200).json({
      message: "Subjects fetched successfully",
      data: {
        totalSubjects: subjects.length,
        subjects,
      },
    });
  } catch (error) {
    next(error);
  }
};
