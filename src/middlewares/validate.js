import InvariantError from '../exceptions/invariant-error.js';

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) return next(error);
  req.validated = value;
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);

  if (error) {
    return next(new InvariantError(error.message));
  }

  return next();
};


export default validate;
