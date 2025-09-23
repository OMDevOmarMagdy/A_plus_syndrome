const express = require("express");
const { protect, restrictTo } = require("../Controllers/authController");
const yearController = require("../Controllers/yearController");
const router = express.Router();

router.get("/", protect, yearController.getAllYears);
router.get("/:id", protect, yearController.getYearById);
router.post("/", protect, restrictTo("admin"), yearController.createYear);
router.patch("/:id", protect, restrictTo("admin"), yearController.updateYear);
router.delete("/:id", protect, restrictTo("admin"), yearController.deleteYear);

module.exports = router;
