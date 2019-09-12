const yup = require('yup');
const ObjectId = require('mongoose').Types.ObjectId;

const objectIdSchema = yup
  .string()
  .test('object-id', 'ObjectId is not valid', ObjectId.isValid);

const listQueryParamsSchema = yup
  .object()
  .shape({
    limit: yup
      .number()
      .integer('Limit is not valid')
      .positive('Limit cannot be negative'),
    skip: yup
      .number()
      .integer('Limit is not valid')
      .positive('Limit cannot be negative'),
  });

module.exports = {
  objectIdSchema,
  listQueryParamsSchema,
};
