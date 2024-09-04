const express = require('express');
const { body } = require('express-validator');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Validation middleware for book data
const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('publicationDate').isDate().withMessage('Valid publication date is required'),
];

// Book Routes
router.post('/books', validateBook, bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', validateBook, bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
