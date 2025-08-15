const User = require("../models/userModel");
const Book = require("../models/bookModel");
const PromoCode = require("../models/promoCodeModel");
const Course = require("../models/courseModel");

exports.getAllOfThem = async (req, res, next) => {
  try {
    const users = await User.find();
    const books = await Book.find();
    const promocodes = await PromoCode.find();
    const courses = await Course.find();

    if (!users || !books || !promocodes || !courses) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      message: "Success",
      totalUsers: users.length,
      totalBooks: books.length,
      totalPromoCodes: promocodes.length,
      totalCourses: courses.length,
      data: {
        users,
        books,
        promocodes,
        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};
