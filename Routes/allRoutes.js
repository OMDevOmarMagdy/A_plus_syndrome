const express = require("express");
const router = express.Router();
const allController = require("../Controllers/allController");

router.get("/", allController.getAllOfThem);

module.exports = router;
