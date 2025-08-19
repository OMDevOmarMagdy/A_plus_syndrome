const express = require("express");
const userController = require("../Controllers/userController");
const { protect } = require("../Controllers/authController"); // your auth middleware
const { restrictTo } = require("../Controllers/authController"); // role middleware

const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin"), userController.getAllUsers) // only admins
  .post(protect, restrictTo("admin"), userController.createUser);

router
  .route("/:id")
  .get(protect, userController.getUser)
  .patch(protect, restrictTo("admin", "user"), userController.updateUser)
  .delete(protect, restrictTo("admin", "user"), userController.deleteUser);

router.get("/:id/courses", protect, userController.getAllCoursesToSpecificUser); // only logged in users can access this route

module.exports = router;
