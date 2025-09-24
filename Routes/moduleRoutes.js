const express = require("express");
const { protect, restrictTo } = require("../Controllers/authController");
const {
  addModule,
  getModules,
  getModulesByYear,
  updateModule,
  deleteModule,
} = require("../Controllers/moduleController");

const upload = require("../utils/uploadWithMulter"); // multer-S3 config
const router = express.Router();

router
  .route("/")
  .get(protect, getModules)
  .post(protect, restrictTo("admin"), upload.single("cover"), addModule);

router.get("/year/:yearId", getModulesByYear);
router
  .route("/:id")
  .patch(protect, restrictTo("admin"), upload.single("cover"), updateModule)
  .delete(protect, restrictTo("admin"), deleteModule);

module.exports = router;
