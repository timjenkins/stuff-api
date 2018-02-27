const Link = require('../models/linkModel.js');
const { validationResult } = require('express-validator/check');

// Link Controller functions
const linkController = {
  all: (req, res) => {
    // Find links from current user
    Link.find({ user: req.user.id }, (err, links) => {
      // Catch server errors
      if (err) {
        res.status(500).send('An error occurred while retrieving your links');
      // Send links
      } else {
        res.status(200).send(links);
      }
    });
  },

  one: (req, res) => {
    // Catch validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    } else {
      // Look up link
      Link.findOne({ _id: req.params.id }, (err, link) => {
        // Catch server errors
        if (err) {
          res.status(500).send('An error occurred while retrieving your links');
        // Authorise user to view link
        } else if (req.user.id !== link.user) {
          res.status(401).send('Invalid permissions');
        // Send link
        } else {
          res.status(200).send(link);
        }
      });
    }
    return res;
  },

  new: (req, res) => {
    // Catch validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    } else {
      // Instantiate link
      const link = new Link();
      // Set params
      link.title = req.body.title;
      link.url = req.body.url;
      link.user = req.user.id;
      link.dateCreated = new Date();
      link.details = {
        price: req.body.price,
      };

      link.save((err) => {
        // Catch server errors
        if (err) {
          res.status(500).send(err);
        // Send success message with created link
        } else {
          res.status(201).send(link);
        }
      });
    }
    return res;
  },
};

module.exports = linkController;
