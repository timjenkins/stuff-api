const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { globalSalt } = require('../../db.config.js');
const { validationResult } = require('express-validator/check');

// user Controller functions
const userController = {
  new: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    } else {
      const user = new User();

      // Adds global salt string to end of password
      const saltedPassword = req.body.password + globalSalt;

      user.username = req.body.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.dateCreated = new Date();

      // Hashes password and then saves the user in the db
      bcrypt.hash(saltedPassword, 14, (err, hash) => {
        user.password = hash;
        user.save((saveErr) => {
          if (err) {
            res.status(500).send(saveErr);
          } else {
            res.status(200).send({
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              dateCreated: user.dateCreated,
            });
          }
        });
      });
    }
  },
};

module.exports = userController;
