const express = require("express");
const userController = require("../Controllers/userController");
const { protect, restrictTo } = require("../Controllers/authController");

const router = express.Router();

// ================== Public Routes ==================
router
  .route("/")
  .get(protect, restrictTo("admin"), userController.getAllUsers) // only admins can list users
  .post(protect, restrictTo("admin"), userController.createUser); // only admins can create users

// ================== User-specific Routes ==================
router
  .route("/:id")
  .get(protect, restrictTo("admin", "user"), userController.getUser) // user can view self, admin can view anyone
  .patch(protect, restrictTo("admin", "user"), userController.updateUser) // user updates self exept the role, admin updates anyone
  .delete(protect, restrictTo("admin"), userController.deleteUser); // only admin deletes users

// ================== Related Data ==================
router.get(
  "/:id/courses",
  protect,
  restrictTo("admin", "user"),
  userController.getAllCoursesToSpecificUser
);

router.get(
  "/:id/subjects",
  protect,
  restrictTo("admin", "user"),
  userController.getAllSubjectsToSpecificUser
);

module.exports = router;
