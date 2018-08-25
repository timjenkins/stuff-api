const { validationResult } = require('express-validator/check');

// Takes request and response objects, as well as callback ƒ
// returns the callback function only if there are no validation errors.

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  return next();
};
