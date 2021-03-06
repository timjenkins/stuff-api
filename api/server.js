const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('express-jwt');
const { dbUrl, jwtSecret, publicPaths } = require('../config');
const routes = require('./config/routes');

// Analytics
require('newrelic');

// Init app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Security package
app.use(helmet());
app.use(helmet.noCache());

// HTTP logging
app.use(morgan('combined'));

// Authenticate API Routes using JWT
app.use(jwt({ secret: jwtSecret }).unless({ path: publicPaths }));
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({error: 'invalid token'});
  }
});

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
app.use('/api', routes);
module.exports = app.listen(8080, '0.0.0.0');
