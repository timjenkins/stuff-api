const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { globalSalt } = require('../../db.config.js');
const { validationResult } = require('express-validator/check');

// Login Controller functions
const loginController = {
  login: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    } else {
      User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) {
          res.status(500).send('User not found');
        } else {
          const enteredSaltedPassword = req.body.password + globalSalt;
          bcrypt.compare(enteredSaltedPassword, foundUser.password, (hashError, compareRes) => {
            if (hashError) {
              res.status(500).send(hashError);
            } else if (compareRes === true) {
              res.status(400).send('Hooray! Password Matches!');
            } else {
              res.status(404).send(compareRes);
            }
          });
        }
      });
    }
    return res;
  },
};


module.exports = loginController;
