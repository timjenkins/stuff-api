const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./db.config.js'); // eslint-disable-line no-unused-vars
const Link = require('./models/Link');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to DB
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(dbConfig.url, {
  useMongoClient: true,
});

mongoose.connection.on('error', (error) => {
  console.log(`Could not connect to the database. Exiting now... \n ${error}`);
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log('Successfully connected to the database');
});


// Links Route
app.get('/links', (req, res) => {
  Link.find({}, (err, links) => {
    if (err) return res.status(500).send('An error occurred while retrieving your links');

    res.status(200).send(links);
    return res;
  });
});

app.post('/links', (req, res) => {
  const link = new Link();
  link.name = req.body.name;
  link.url = req.body.url;
  link.dateCreated = new Date();
  link.details = {
    price: req.body.price,
  };

  // save the bear and check for errors
  link.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: `Link created ${link}` });
    }
  });
});

app.listen(3000);
