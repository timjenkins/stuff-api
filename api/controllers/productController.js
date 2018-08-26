const Product = require('../models/productModel');
const findUserAnd = require('../helpers/findUserAnd');
const { addProductToList, removeProductFromList } = require('./listController');
const validateInput = require('../helpers/validateInput');

// Product Controller functions

const productController = {
  one: (req, res) => {
    validateInput(req, res, () => {
      Product.findById(req.params.id, (findErr, product) => {
        if (findErr) {
          return res.status(404).send(findErr);
        }
        if (req.user._id !== product.userId) {
          return res.status(401).send('You do not have permissions to view this product');
        }
        return res.status(200).send(product);
      });
    });
    return res;
  },

  new: (req, res) => {
    findUserAnd(req, res, () => {
      validateInput(req, res, () => {
        // Create Item
        const product = new Product({
          userId: req.user.id,
          ...req.body,
        });

        // Save product
        product.save((err, newItem) => {
          // Handle error case
          if (err) {
            return res.status(500).send(err);
          }

          // if no errors on save, proceed to save to add to list
          return addProductToList(req.body.listId, newItem._id, (updateListError) => {
            if (updateListError) {
              // Sends error if addItemToList fails
              return res.status(500).send(updateListError);
              // TODO: delete the newly created product
            }
            // Yay we made it! returns newList object
            return res.status(201).send(newItem);
          });
        });
      });
    });
    return res;
  },

  update: (req, res) => {
    validateInput(req, res, () => {
      // Find the product to update
      Product.findById(req.params.id, (findErr, product) => {
        if (findErr) {
          return res.status(404).send(findErr);
        }
        if (req.user.id !== product.userId) {
          return res.status(401).send('You do not have permissions to edit this product');
        }
        product.set({ ...req.body });
        // Save product
        return product.save((err, newItem) => {
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
      Product.findOne({ _id: req.params.id }, (findErr, product) => {
        if (!product) {
          return res.status(404).send(findErr);
        }
        if (req.user.id !== product.userId) {
          return res.status(401).send('You do not have permissions to delete this product');
        }

        // Delete refs in list
        return product.remove((deleteError) => {
          // Handle error case
          if (deleteError) {
            return res.status(500).send(deleteError);
          }

          return removeProductFromList(product.listId, product._id, (updateListError) => {
            if (updateListError) {
              // Sends error if addItemToList fails
              return res.status(500).send(updateListError);
            }
            // Product was successfully deleted
            return res.status(200).send({ message: 'Product successfully deleted' });
          });
        });
      });
    });
    return res;
  },
};

module.exports = productController;
