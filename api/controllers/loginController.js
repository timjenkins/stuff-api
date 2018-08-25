const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { globalSalt, jwtSecret } = require('../../config');
const validateInput = require('../helpers/validateInput');
const jwt = require('jsonwebtoken');

// Login Controller functions
const loginController = {
  generateToken: (user) => {
    const token = jwt.sign({
      id: user._id,
    }, jwtSecret, {
      expiresIn: 900,
    });

    return token;
  },

  login: (req, res) => {
    validateInput(req, res, () => {
      // Find user by email
      User.findOne({ email: req.body.email }, (err, foundUser) => {
        // Handle case where no user is found
        if (err) {
          return res.status(404).send('Invalid Credentials');
        }
        // Salt the password
        const enteredSaltedPassword = req.body.password + globalSalt;

        // Password check
        return bcrypt.compare(
          enteredSaltedPassword,
          foundUser.password,
          (hashError, compareRes) => {
            // Handle server error
            if (hashError) {
              return res.status(500).send(hashError);

            // Handle wrong password
            } else if (compareRes !== true) {
              return res.status(404).send('Invalid Credentials');
            }

            // Handle success
            return res.status(200).send({
              token: loginController.generateToken(foundUser),
            });
          },
        );
      });

      return res;
    });
  },
};


module.exports = loginController;
