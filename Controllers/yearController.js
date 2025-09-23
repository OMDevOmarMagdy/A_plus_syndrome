const Year = require("../models/yearModel");

exports.getAllYears = async (req, res) => {
  try {
    const years = await Year.find();
    res.status(200).json({
      status: "success",
      results: years.length,
      data: {
        years,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getYearById = async (req, res) => {
  try {
    const year = await Year.findById(req.params.id);
    if (!year) {
      return res
        .status(404)
        .json({ status: "fail", message: "Year not found" });
    }
    res.status(200).json({
      status: "success",
      data: {
        year,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.createYear = async (req, res) => {
  try {
    const newYear = await Year.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newYear,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateYear = async (req, res) => {
  try {
    const updatedYear = await Year.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedYear) {
      return res
        .status(404)
        .json({ status: "fail", message: "Year not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedYear,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.deleteYear = async (req, res) => {
  try {
    const deletedYear = await Year.findByIdAndDelete(req.params.id);
    if (!deletedYear) {
      return res
        .status(404)
        .json({ status: "fail", message: "Year not found" });
    }

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
