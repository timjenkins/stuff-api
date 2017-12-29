const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./db.config.js'); // eslint-disable-line no-unused-vars
const routes = require('./config/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to DB
mongoose.Promise = global.Promise;
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


// Connect Router
app.use('/', routes);

module.exports = app.listen(3000);
