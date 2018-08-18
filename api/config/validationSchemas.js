const { check } = require('express-validator/check');

const validationSchemas = {
  user: [
    check('email').isEmail(),
    check('password').matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/),
  ],

  login: [
    check('email').isEmail(),
    check('password').isAscii(),
  ],

  list: [
    check('name').exists(),
  ],

  product: [
    check('name').not().isEmpty(),
    check('url').isURL(),
    check('price').optional().isCurrency({ allow_negatives: false }),
    check('currency').optional().isAlpha(),
  ],

  productUpdate: [
    check('id').isUUID(),
    check('listId').isUUID(),
    check('url').optional().isURL(),
    check('price').optional().isCurrency({ allow_negatives: false }),
    check('currency').optional().isAlpha(),
  ],

  productId: [
    check('id').isAlphanumeric(),
  ],

  userId: [
    check('id').isUUID(),
  ],

  listId: [
    check('id').isUUID(),
  ],
};


module.exports = validationSchemas;
