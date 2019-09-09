function beautifyValidationError(error) {
  return {
    type: 'ValidationError',
    message: error._message,
    errors: Object.values(error.errors).map((e) => ({
      name: e.name,
      path: e.path,
      message: e.message,
    })),
  };
}

module.exports = beautifyValidationError;
