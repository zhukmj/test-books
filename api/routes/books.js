const booksRouter = require('express').Router();
const { Book } = require('../models');
const { beautifyValidationError } = require('../utils');

// Retrive all books
booksRouter.get('/', (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = parseInt(req.query.skip, 10) || 0;

  return Book
    .find()
    .limit(limit)
    .skip(skip)
    .exec((err, books) => {
      if (err) {
        return next(err);
      }

      return res.json(books);
    });
});

// Retrive a single book
booksRouter.get('/:bookId', (req, res, next) => {
  return Book
    .findById(req.params.bookId)
    .exec((err, book) => {
      if (err) {
        return err.name === 'CastError'
          ? next()
          : next(err);
      }

      return res.json(book);
    });
});

// Create a book
booksRouter.post('/', (req, res, next) => {
  new Book(req.body).save((err, book) => {
    if (err) {
      return err.name === 'ValidationError'
        ? res.status(400).json(beautifyValidationError(err))
        : next(err);
    }

    res.json(book);
  });
});

module.exports = booksRouter;
