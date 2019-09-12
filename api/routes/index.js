const router = require('express').Router();
const booksRouter = require('./booksRouter');

router.use('/books', booksRouter);

module.exports = router;
