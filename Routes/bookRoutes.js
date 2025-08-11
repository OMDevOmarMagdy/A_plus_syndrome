const express = require("express");
const router = express.Router();

const bookController = require("../Controllers/bookController");
const authController = require("../Controllers/authController");

router.get("/", bookController.getBooks);

router.use(authController.protect, authController.restrictTo("admin"));
router.post("/add-book", bookController.addBook);
router.patch("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
