const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { globalSalt } = require('../../config');
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
              id: user._id,
            });
          }
        });
      });
    }
  },

  one: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    } else {
      User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
          res.status(500).send('An error occurred while retrieving your links');
        } else if (req.user.id.toString() !== user._id.toString()) {
          res.status(500).send('You do not have proper permissions to view this user.');
        } else {
          const result = user;
          result.password = null;
          res.status(200).send(result);
        }
      });
    }
    return res;
  },

  // DEBUG ONLY
  // all: (req, res) => {
  //   User.find({}, (err, users) => {
  //     if (err) return res.status(500).send('An error occurred while retrieving your links');

  //     res.status(200).send(users);
  //     return res;
  //   });
  // },
};

module.exports = userController;
