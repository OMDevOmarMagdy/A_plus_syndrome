const Book = require("../models/bookModel");
const ActivityLog = require("../models/activityLogModel");

exports.addBook = async (req, res, next) => {
  try {
    const { title, author, summary, cover, price } = req.body;

    if (!title || !author || !summary || !cover || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({ title, author, summary, cover, price });
    console.log(book);

    await ActivityLog.create({
      action: "ADD",
      description: `Book "${book.title}" was added`,
      user: req.user._id,
      type: "book",
    });

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
    const bookId = req.params.id;
    const { title, summary, author, price, cover } = req.body;

    const book = await Book.findByIdAndUpdate(
      bookId,
      { title, summary, author, price, cover },
      { new: true, runValidators: true }
    );
    console.log(book);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await ActivityLog.create({
      action: "UPDATE",
      description: `Book "${book.title}" was updated`,
      user: req.user._id,
      type: "book",
    });

    res.status(200).json({
      message: "Book updated successfully",
      data: { book },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await ActivityLog.create({
      action: "DELETE",
      description: `Book "${book.title}" was deleted`,
      user: req.user._id,
      type: "book",
    });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
