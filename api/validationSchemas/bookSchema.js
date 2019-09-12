const yup = require('yup');

const bookSchema = yup.object().shape({
  title: yup
    .string()
    .required(),
  author: yup
    .string()
    .required(),
  publisher: yup
    .string()
    .required(),
  publishDate: yup
    .date()
    .required(),
  rating: yup
    .number()
    .min(1)
    .max(3)
    .required(),
  status: yup
    .string()
    .oneOf(['checked-in', 'checked-out'])
    .required(),
});

module.exports = bookSchema;
