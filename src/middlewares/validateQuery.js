import InvariantError from '../exceptions/invariant-error.js';

const validateQuery = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);

  if (error) {
    return next(new InvariantError(error.message));
  }

  return next();
};

export default validateQuery;
