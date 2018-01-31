const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { dbUrl } = require('../config');
const routes = require('./config/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.noCache());
app.use(morgan('combined'));

// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
  useMongoClient: true,
});

mongoose.connection.on('error', () => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log('Successfully connected to the database');
});


// Connect Router
app.use('/', routes);

module.exports = app.listen(3000);
