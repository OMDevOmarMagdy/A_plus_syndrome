const express = require("express");
const router = express.Router();

const bookController = require("../Controllers/bookController");

router.post("/add-book", bookController.addBook);
router.get("/", bookController.getBooks);
router.patch("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
