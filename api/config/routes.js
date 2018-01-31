const express = require('express');
const linkController = require('../controllers/linkController');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const validationSchemas = require('./validationSchemas');
const expressJwt = require('express-jwt');
const { jwtSecret } = require('../../config');

const authenticate = expressJwt({ secret: jwtSecret });
const routes = express.Router();

// Links
// -----------------------------------------
// get all
routes.get('/links', authenticate, linkController.all);
// Create New Link
routes.post('/links', authenticate, validationSchemas.link, linkController.new);
// Get one link
routes.get('/links/:id', authenticate, validationSchemas.linkId, linkController.one);


// User
// -----------------------------------------
// Create New User
routes.post('/signup', validationSchemas.user, userController.new);
// Get User Info
routes.get('/user/:id', authenticate, validationSchemas.userId, userController.one);
// Get All Users
// routes.get('/user', authenticate, userController.all);


// Login
// -----------------------------------------
// check email + password
routes.post('/login', validationSchemas.login, loginController.login);


module.exports = routes;
