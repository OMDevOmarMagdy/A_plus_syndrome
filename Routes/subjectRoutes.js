const express = require("express");
const {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectsByModule,
} = require("../Controllers/subjectController");
const { protect, restrictTo } = require("../Controllers/authController");
const upload = require("../utils/uploadWithMulter"); // 📌 الميدل وير اللي بيهندل رفع الملفات
const router = express.Router();

// ✅ Get all subjects
router.get("/", protect, getAllSubjects);

// ✅ Get subject by ID
router.get("/:id", protect, getSubjectById);

// ✅ Get subjects by module
router.get("/module/:moduleId", protect, getSubjectsByModule);

// ✅ Create subject (مع رفع cover)
router.post(
  "/",
  protect,
  restrictTo("admin"),
  upload.single("cover"),
  createSubject
);

// ✅ Update subject (مع رفع cover لو عايز تغيّرها)
router.put(
  "/:id",
  protect,
  restrictTo("admin"),
  upload.single("cover"),
  updateSubject
);

// ✅ Delete subject
router.delete("/:id", protect, restrictTo("admin"), deleteSubject);

module.exports = router;
