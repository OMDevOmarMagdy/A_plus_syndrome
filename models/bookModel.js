const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

// This code defines a Mongoose schema for a "Book" model with the following fields:

// - `title`: A required string field for the book's title.
// - `description`: A required string field for the book's description.
// - `price`: A required number field for the book's price
