const User = require('../models/userModel');

// Takes User Id, response object, and function to execute,
// If user is not found, error response is returned.
// If user is found, passes user to callback function.

module.exports = (req, res, next) => {
  User.findOne({ _id: req.user.id }, (findUserError) => {
    if (findUserError) {
      return res.status(500).send({error: 'Could not find user');
    }
    return next();
  });
};
