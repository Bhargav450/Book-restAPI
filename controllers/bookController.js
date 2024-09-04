const { validationResult } = require("express-validator");
const { Op } = require('sequelize');
const Book = require("../models/book");


// Create a new book
exports.createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).send(errorMessages[0]);
  }

  try {
    const { title, author, isbn, publicationDate } = req.body;
    const book = await Book.create({ title, author, isbn, publicationDate });
    res.status(201).json(book);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: " Book already exists" });
    }
    res.status(500).json({ error: "Error creating book" });
  }
};

// Retrieve all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving books" });
  }
};

// Retrieve a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving book" });
  }
};

// Update an existing book
exports.updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).send(errorMessages[0]);
  }

  try {
    const { title, author, isbn, publicationDate } = req.body;
    const bookId = req.params.id;

    // Find the book by ID
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });
    // Check if another book with the same ISBN exists (excluding the current book)
    const existingBook = await Book.findOne({
      where: { isbn, id: { [Op.ne]: bookId } },
    });
    if (existingBook) {
      return res
        .status(409)
        .send("Another book with this ISBN already exists" );
    }

    // Update the book details
    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.publicationDate = publicationDate;

    await book.save();
    res.status(200).json({ message: "Book updated successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error updating book" });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await book.destroy();
    return res.status(200).json("Book deleted successfully!!!");
  } catch (error) {
    res.status(500).json({ error: "Error deleting book" });
  }
};
