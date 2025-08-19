const User = require("../models/userModel");
const Course = require("../models/courseModel");

// 📌 Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, image } = req.body;

    const newUser = await User.create({ name, email, password, role, image });

    // Hide password in response
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// 📌 Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    console.log(users);
    const numOfUsers = await User.countDocuments();

    res.status(200).json({
      status: "success",
      totalUsers: numOfUsers, // ✅ return number of users
      results: users.length, // number of users in this query
      data: users,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// 📌 Get Single User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// 📌 Update User
exports.updateUser = async (req, res) => {
  try {
    // Prevent password updates here for security
    if (req.body.password) {
      return res.status(400).json({
        status: "fail",
        message: "Use the password update endpoint instead",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({ status: "success", data: updatedUser });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// 📌 Delete User
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getAllCoursesToSpecificUser = async (req, res, next) => {
  try {
    // Get userId and User and check
    const userId = req.params.id;
    const user = await User.findById(userId).populate("courses");
    if (!user) {
      res.status(404).json({ status: "fail", message: "User not found" });
    }

    // Get all courses except the ones user already has
    const excludedCourses = user.courses.map((c) => c._id);
    const otherCourses = await Course.find({ _id: { $nin: excludedCourses } });

    // Response
    res.status(200).json({
      status: "success",
      userCourses: user.courses,
      otherCourses: otherCourses,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
