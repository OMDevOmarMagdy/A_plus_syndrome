const express = require("express");
const router = express.Router();

const bookController = require("../Controllers/bookController");

router.post("/add-book", bookController.addBook);
router.get("/", bookController.getBooks);

module.exports = router;
