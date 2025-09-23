const Module = require("../models/moduleModel");
const Year = require("../models/yearModel");

const ActivityLog = require("../models/activityLogModel");
const s3 = require("../utils/s3");
const {
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");

const getYearId = async (res, year_name) => {
  const year = await Year.findOne({ name: year_name });
  if (!year) {
    return res.status(404).json({
      status: "error",
      message: "NO year founded",
    });
  }
  return year._id;
};

exports.addModule = async (req, res, next) => {
  try {
    const { name, description, price, year_name } = req.body;
    const cover = req.file ? req.file.key : null; // S3 file key

    const yearId = await getYearId(res, year_name);
    console.log(yearId);

    if (!name || !description || !yearId) {
      return res.status(400).json({ message: "All fields are required..." });
    }

    // Create new module
    const module = await Module.create({
      name,
      description,
      price,
      cover,
      year_id: yearId,
    });

    // // Log activity
    // await ActivityLog.create({
    //   action: "ADD",
    //   description: `Module "${module.name}" was added`,
    //   user: req.user._id,
    //   type: "module",
    // });

    res.status(201).json({
      message: "Module added successfully",
      data: {
        module,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getModules = async (req, res, next) => {
  try {
    const modules = await Module.find().populate("year_id", "name");
    if (!modules || modules.length === 0) {
      return res.status(404).json({ message: "No modules found" });
    }

    res.status(200).json({
      message: "Modules fetched successfully",
      data: {
        total: modules.length,
        modules,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getModulesByYear = async (req, res, next) => {
  try {
    const { yearId } = req.params;
    const modules = await Module.find({ year_id: yearId });

    res.status(200).json({
      message: "Modules by year fetched successfully",
      data: {
        total: modules.length,
        modules,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateModule = async (req, res, next) => {
  try {
    const moduleId = req.params.id;
    const { name, description, price, year_name } = req.body;
    const cover = req.file ? req.file.key : undefined;

    let yearId = "";
    if (year_name) {
      yearId = await getYearId(res, year_name);
      console.log(yearId);
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (cover) updateData.cover = cover;
    if (yearId) updateData.year_id = yearId;

    const module = await Module.findByIdAndUpdate(moduleId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // // Log update activity
    // await ActivityLog.create({
    //   action: "UPDATE",
    //   description: `Module "${module.name}" was updated`,
    //   user: req.user ? req.user._id : null,
    //   type: "module",
    // });

    res.status(200).json({
      message: "Module updated successfully",
      data: { module },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const moduleId = req.params.id;
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Delete cover from S3 if exists
    if (module.cover) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: module.cover,
        })
      );
    }

    // Delete from DB
    await Module.findByIdAndDelete(moduleId);

    // await ActivityLog.create({
    //   action: "DELETE",
    //   description: `Module "${module.name}" was deleted`,
    //   user: req.user._id,
    //   type: "module",
    // });

    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    next(error);
  }
};
