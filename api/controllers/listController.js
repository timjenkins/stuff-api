const List = require('../models/listModel.js');
const validateInput = require('../helpers/validateInput');
const { addListToUser } = require('./userController');
const findUserAnd = require('../helpers/findUserAnd');


// Link Controller functions
const listController = {
  addProductToList: (listId, productId, next) => List.findByIdAndUpdate(
    listId,
    { $push: { products: productId } },
    err => next(err),
  ),

  all: (req, res) => {
    List.find({ userId: req.user.id }, (err, lists) => {
      if (err) {
        return res.status(500).send('An error occurred while retrieving your lists');
      }
      res.status(200).send(lists);
      return res;
    });
  },

  one: (req, res) => {
    validateInput(req, res, () => {
      List.findById(req.params.id)
        .populate('products')
        .exec((findErr, list) => {
          if (findErr || !list) {
            return res.status(404).send(findErr || 'Cannot find list');
          }
          if (req.user.id !== list.userId) {
            return res.status(401).send('You do not have permissions to view this list');
          }
          return res.status(200).send(list);
        });
    });
    return res;
  },

  new: (req, res) => {
    findUserAnd(req, res, () => {
      validateInput(req, res, () => {
        // Create Item
        const list = new List({
          userId: req.user.id,
          ...req.body,
        });

        // Save list
        list.save((saveError, newList) => {
          // Handle error case
          if (saveError) {
            return res.status(500).send(saveError);
          }

          // if no errors on save, proceed to save to add to list
          return addListToUser(req.user.id, newList._id, (updateUserError) => {
            if (updateUserError) {
              // Sends error if addItemToList fails
              return res.status(500).send('User error thing');
              // TODO: delete the newly created list
            }
            // Yay we made it! returns newList object
            return res.status(201).send(newList);
          });
        });
      });
    });
    return res;
  },
};

module.exports = listController;
