const Book = require("../models/bookModel");
const ActivityLog = require("../models/activityLogModel");
const s3 = require("../utils/s3");
const {
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");

exports.addBook = async (req, res, next) => {
  try {
    const { title, summary, price } = req.body;
    const cover = req.file ? req.file.key : null; // file uploaded to S3

    if (!title || !summary) {
      return res.status(400).json({ message: "All fields are required..." });
    }

    // Create the book with cover image
    const book = await Book.create({ title, summary, cover, price });
    // console.log(book);

    // Log activity
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

    // text fields from body
    const { title, summary, author, price } = req.body;
    // file (cover) from multer-S3
    const cover = req.file ? req.file.key : undefined;

    // build update object dynamically (ignore undefined fields)
    const updateData = {};
    if (title) updateData.title = title;
    if (summary) updateData.summary = summary;
    if (author) updateData.author = author;
    if (price) updateData.price = price;
    if (cover) updateData.cover = cover;

    const book = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Log update activity
    await ActivityLog.create({
      action: "UPDATE",
      description: `Book "${book.title}" was updated`,
      user: req.user ? req.user._id : null, // 👈 safe access
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
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // ✅ delete cover if exists
    if (book.cover) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: book.cover,
        })
      );
    }

    // ✅ delete all book files if exist
    if (book.files && book.files.length > 0) {
      const objectsToDelete = book.files.map((f) => ({ Key: f.fileKey }));
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Delete: { Objects: objectsToDelete },
        })
      );
    }

    // finally delete from DB
    await Book.findByIdAndDelete(bookId);

    await ActivityLog.create({
      action: "DELETE",
      description: `Book "${book.title}" was deleted`,
      user: req.user._id,
      type: "book",
    });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    next(error);
  }
};
