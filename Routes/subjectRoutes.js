const express = require("express");
const {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectsByModule,
  openSubject,
} = require("../Controllers/subjectController");

const { protect, restrictTo } = require("../Controllers/authController");
const upload = require("../utils/uploadWithMulter");
const router = express.Router();

router.get("/", protect, getAllSubjects);
router.get("/:id", protect, getSubjectById);

// Get subjects by module
router.get("/module/:moduleId", protect, getSubjectsByModule);
router.post("/open-subject", protect, restrictTo("admin"), openSubject);

router.post(
  "/",
  protect,
  restrictTo("admin"),
  upload.single("cover"),
  createSubject
);

router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  upload.single("cover"),
  updateSubject
);
router.delete("/:id", protect, restrictTo("admin"), deleteSubject);

module.exports = router;
