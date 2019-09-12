function validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate({
        params: req.params,
        query: req.query,
        body: req.body,
      }, {
        abortEarly: false
      });

      return next();
    } catch(err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json(err);
      }

      return next(err);
    }
  };
}

module.exports = validate;
