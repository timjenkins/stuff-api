const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./db.config.js'); // eslint-disable-line no-unused-vars
const Link = require('./models/Link');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to DB
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


app.listen(3000);
