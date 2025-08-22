const express = require("express");
const router = express.Router();

const bookController = require("../Controllers/bookController");
const authController = require("../Controllers/authController");
const upload = require("../utils/uploadWithMulter");

router.get("/", bookController.getBooks);

router.use(authController.protect, authController.restrictTo("admin"));
router.post("/", upload.single("cover"), bookController.addBook);
router.patch("/:id", upload.single("cover"), bookController.updateBook);

// router.post("/add-book", bookController.addBook);
// router.patch("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
