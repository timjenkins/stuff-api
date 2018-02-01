const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('express-jwt');
const { dbUrl, jwtSecret, publicPaths } = require('../config');
const routes = require('./config/routes');

// Init app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Security package
app.use(helmet());
app.use(helmet.noCache());

// HTTP logging
app.use(morgan('combined'));

// Authenticate API Routes using JWT
app.use(jwt({ secret: jwtSecret }).unless({ path: publicPaths }));
app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token');
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
app.use('/', routes);

module.exports = app.listen(3000);
