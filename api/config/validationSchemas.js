const { check } = require('express-validator/check');

const validationSchemas = {
  user: [
    check('username').isAlphanumeric(),
    check('firstName').isAlpha(),
    check('lastName').isAlpha(),
    check('email').isEmail(),
    check('password').matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/),
  ],

  login: [
    check('email').isEmail(),
    check('password').isAscii(),
  ],

  link: [
    check('title').isAscii(),
    check('url').isURL(),
    check('price').isCurrency({ allow_negatives: false }),
  ],

  linkId: [
    check('id').isAlphanumeric(),
  ],
};


module.exports = validationSchemas;
