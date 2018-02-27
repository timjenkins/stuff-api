const Link = require('../models/linkModel.js');
const { validationResult } = require('express-validator/check');

// Link Controller functions
const linkController = {
  all: (req, res) => {
    Link.find({ user: req.user.id }, (dbErr, links) => {
      if (dbErr) {
        res.status(500).send('An error occurred while retrieving your links');
      } else {
        res.status(200).send(links);
      }
    });
  },

  one: (req, res) => {
    // Catch validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(422).json({ errors: validationErrors.mapped() });
    } else {
      Link.findOne({ _id: req.params.id }, (dbErr, link) => {
        if (dbErr) {
          res.status(500).send('An error occurred while retrieving your links');
        // Authorise user to view link
        } else if (req.user.id !== link.user) {
          res.status(401).send('Invalid permissions');
        } else {
          res.status(200).send(link);
        }
      });
    }
    return res;
  },

  new: (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(422).json({ errors: validationErrors.mapped() });
    } else {
      const link = new Link();

      link.title = req.body.title;
      link.url = req.body.url;
      link.user = req.user.id;
      link.dateCreated = new Date();
      link.details = {
        price: req.body.price,
      };

      link.save((dbErr) => {
        if (dbErr) {
          res.status(500).send(dbErr);
        } else {
          res.status(201).send(link);
        }
      });
    }
    return res;
  },
};

module.exports = linkController;
