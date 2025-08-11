const Book = require("../models/bookModel");

exports.addBook = async (req, res, next) => {
  try {
    const { title, author, summary, cover, price } = req.body;

    if (!title || !author || !summary || !cover || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({ title, author, summary, cover, price });
    console.log(book);
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
        totalBooks: books.lenght,
        books,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { title, summary, author, price, cover } = req.body;

    const user = await Book.findByIdAndUpdate(
      userId,
      { title, summary, author, price, cover },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await Book.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
