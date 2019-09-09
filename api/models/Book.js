const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required'],
  },
  publishDate: {
    type: Date,
    required: [true, 'Publish Date is required'],
  },
  rating: {
    type: Number,
    min: [1, 'Rating cannot be lower than 1'],
    max: [3, 'Rating cannot be greater than 3'],
    required: [true, 'Rating is required'],
  },
  status: {
    type: String,
    enum: {
      values: ['checked-in', 'checked-out'],
      message: 'Status must be either "checked-in" or "checked-out"',
    },
    required: [true, 'Status is required'],
  },
});

module.exports = mongoose.model('Book', bookSchema);
