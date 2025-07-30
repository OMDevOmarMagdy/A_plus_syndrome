const Book = require("../models/bookModel");

exports.addBook = async (req, res, next) => {
  try {
    const { title, author, summary, cover, price } = req.body;

    if (!title || !author || !summary || !cover || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({ title, author, summary, cover, price });
    res.status(201).json({
      message: "Your book is added",
      data: {
        book,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    console.log(books);
    if (!books) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json({
      message: "Books fetched successfully",
      data: {
        books,
      },
    });
  } catch (error) {
    next(error);
  }
};
