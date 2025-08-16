const express = require("express");
const router = express.Router();
const allController = require("../Controllers/allController");

router.get("/", allController.getAllOfThem); // Assuming you have a method named `getAll` in your controller

module.exports = router;
