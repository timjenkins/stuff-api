const Link = require('../models/linkModel.js');

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
    Link.findOne({ _id: req.params.id }, (err, links) => {
      if (err) return res.status(500).send('An error occurred while retrieving your links');

      res.status(200).send(links);
      return res;
    });
  },

  new: (req, res) => {
    const link = new Link();
    link.name = req.body.name;
    link.url = req.body.url;
    link.dateCreated = new Date();
    link.details = {
      price: req.body.price,
    };

    link.save((err) => {
      if (err) {
        res.status(500).send(err);
        res.send(err);
      } else {
        res.json({ message: `Link created ${link}` });
      }
    });
  },
};

module.exports = linkController;
