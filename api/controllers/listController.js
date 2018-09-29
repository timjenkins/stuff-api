const List = require('../models/listModel.js');
const validateInput = require('../helpers/validateInput');
const { addListToUser, removeListFromUser } = require('./userController');
const findUserAnd = require('../helpers/findUserAnd');


// Link Controller functions
const listController = {
  addProductToList: (listId, productId, next) => List.findByIdAndUpdate(
    listId,
    { $push: { products: productId } },
    err => next(err),
  ),

  removeProductFromList: (listId, productId, next) => {
    List.findByIdAndUpdate(
      listId,
      { $pullAll: { products: [productId] } },
      err => next(err),
    );
  },

  all: (req, res) => {
    List.find({ userId: req.user.id }, (err, lists) => {
      if (err) {
        return res.status(500).send({error: 'An error occurred while retrieving your lists');
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
            return res.status(401).send({error: 'You do not have permissions to view this list');
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
              return res.status(500).send({error: 'User error thing');
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

  update: (req, res) => {
    validateInput(req, res, () => {
      // Find the list to update
      List.findById(req.params.id, (findErr, list) => {
        if (findErr) {
          return res.status(404).send(findErr);
        }
        if (req.user.id !== list.userId) {
          return res.status(401).send({error: 'You do not have permissions to edit this list');
        }
        list.set({ ...req.body });
        // Save list
        return list.save((err, newItem) => {
          // Handle error case
          if (err) {
            return res.status(500).send(err);
          }
          // if no errors on save, return success
          return res.status(201).send(newItem);
        });
      });
    });
    return res;
  },

  delete: (req, res) => {
    validateInput(req, res, () => {
      // Find the product
      List.findOne({ _id: req.params.id }, (findErr, list) => {
        if (!list) {
          return res.status(404).send({error: 'No list exists with that ID');
        }
        if (req.user.id !== list.userId) {
          return res.status(401).send({error: 'You do not have permissions to delete this list');
        }

        // Delete refs in list
        return list.remove((deleteError) => {
          // Handle error case
          if (deleteError) {
            return res.status(500).send(deleteError);
          }

          return removeListFromUser(list.userId, list._id, (updateUserError) => {
            if (updateUserError) {
              // Sends error if addItemToList fails
              return res.status(500).send(updateUserError);
            }
            // List was successfully deleted
            return res.status(200).send({ message: 'List successfully deleted' });
          });
        });
      });
    });
    return res;
  },
};

module.exports = listController;
