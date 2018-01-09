const Link = require('../models/linkModel.js');
const { validationResult } = require('express-validator/check');

// Link Controller functions
const linkController = {
  all: (req, res) => {
    Link.find({}, (err, links) => {
      if (err) return res.status(500).send('An error occurred while retrieving your links');

      res.status(200).send(links);
      return res;
    });
  },

  one: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    } else {
      Link.findOne({ _id: req.params.id }, (err, link) => {
        if (err) {
          res.status(500).send('An error occurred while retrieving your links');
        } else {
          res.status(200).send(link);
        }
      });
    }
    return res;
  },

  new: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    } else {
      const link = new Link();
      link.title = req.body.title;
      link.url = req.body.url;
      link.dateCreated = new Date();
      link.details = {
        price: req.body.price,
      };

      link.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(link);
        }
      });
    }
    return res;
  },
};

module.exports = linkController;
