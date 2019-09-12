const booksRouter = require('express').Router();
const yup = require('yup');
const { Book } = require('../models');
const { validate } = require('../middlewares');
const {
  bookSchema,
  objectIdSchema,
  listQueryParamsSchema,
} = require('../validationSchemas');


/**
 * RETRIVE ALL BOOKS
 */
const getAllBooksReqSchema = yup.object({
  query: listQueryParamsSchema,
});

booksRouter.get('/', validate(getAllBooksReqSchema), async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = parseInt(req.query.skip, 10) || 0;

  try {
    const books = await Book.find({}, null, { skip, limit });

    return res.json(books);
  } catch(err) {
    return next(err);
  }
});


/**
 * RETRIVE A SINGLE BOOK BY ID
 */
const getSingleBookReqSchema = yup.object({
    params: yup.object({
      bookId: objectIdSchema,
    }),
  });

booksRouter.get('/:bookId', validate(getSingleBookReqSchema), async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);

    // If book has been found
    if (book) {
      return res.json(book);
    }
  } catch(err) {
    return next(err);
  }

  // Book has not been found
  return res.status(404).json({
    message: `Book with id ${req.params.bookId} not found`,
  });
});


/**
 * CREATE A BOOK
 */
const createBookReqSchema = yup.object({
  body: bookSchema,
});

booksRouter.post('/', validate(createBookReqSchema), async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    return res.json(book);
  } catch(err) {
    return next(err);
  }
});


/**
 * UPDATE A BOOK
 */
const updateBookReqSchema = yup.object({
  params: yup.object({
    bookId: objectIdSchema,
  }),
  body: bookSchema,
});

booksRouter.put('/:bookId', validate(updateBookReqSchema), async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate({ _id: req.params.bookId }, req.body, { new: true });

    // If book has been found
    if (book) {
      return res.json(book);
    }
  } catch(err) {
    return next(err);
  }

  // Book has not been found
  res.status(404).json({
    message: `Book with id ${req.params.bookId} not found`,
  });
});


/**
 * DELETE A BOOK
 */
const deleteBookReqSchema = yup.object({
  params: yup.object({
    bookId: objectIdSchema,
  }),
});

booksRouter.delete('/:bookId', validate(deleteBookReqSchema), async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);

    // If book has been found
    if (book) {
      return res.json({
        _id: book._id,
      });
    }
  } catch(err) {
    return next(err);
  }

  // Book has not been found
  res.status(404).json({
    message: `Book with id ${req.params.bookId} not found`,
  });
});


module.exports = booksRouter;
