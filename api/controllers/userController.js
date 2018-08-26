const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { globalSalt } = require('../../config');
const validateInput = require('../helpers/validateInput');

// user Controller functions
const userController = {
  addListToUser: (userId, listId, next) => User.findByIdAndUpdate(
    userId,
    { $push: { lists: listId } },
    err => next(err),
  ),

  removeListFromUser: (userId, listId, next) => {
    User.findByIdAndUpdate(
      userId,
      { $pullAll: { lists: [listId] } },
      err => next(err),
    );
  },


  new: (req, res) => {
    validateInput(req, res, () => {
      // Adds global salt string to end of password
      const saltedPassword = req.body.password + globalSalt;

      // Hashes password and then saves the user in the db
      bcrypt.hash(saltedPassword, 14, (encryptionError, hash) => {
        // Handle encryption error
        if (encryptionError) {
          res.status(500).send('A server error has occured');
        }

        // Create new user
        const user = new User({
          email: req.body.email,
          password: hash,
        });

        // Save user
        user.save((saveErr, createdUser) => {
          // Handle save error
          if (saveErr) {
            return res.status(500).send(saveErr);
          }
          // Return some user information
          return res.status(201).send({
            email: createdUser.email,
            id: createdUser._id,
          });
        });
      });
    });
  },

  one: (req, res) => {
    validateInput(req, res, () => {
      User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
          res.status(500).send('An error occurred while retrieving your links');
        } else if (req.user.id !== user._id) {
          res.status(403).send('You do not have proper permissions to view this user.');
        } else {
          const result = user;
          result.password = null;
          res.status(200).send(result);
        }
      });
    });
    return res;
  },

  // DEBUG ONLY
  all: (req, res) => {
    User.find({}, (err, users) => {
      if (err) return res.status(500).send('An error occurred while retrieving the users');

      res.status(200).send(users);
      return res;
    });
  },
};

module.exports = userController;
