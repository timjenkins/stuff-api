const express = require('express');
const linkController = require('../controllers/linkController');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const validationSchemas = require('./validationSchemas');

const routes = express.Router();

// Links
// -----------------------------------------
// get all
routes.get('/links', linkController.all);
// Create New Link
routes.post('/links', validationSchemas.link, linkController.new);
// Get one link
routes.get('/links/:id', validationSchemas.linkId, linkController.one);


// User
// -----------------------------------------
// Create New User
routes.post('/signup', validationSchemas.user, userController.new);
// Get User Info
routes.get('/user/:id', validationSchemas.userId, userController.one);
// Get All Users
// routes.get('/user', userController.all);


// Login
// -----------------------------------------
// check email + password
routes.post('/login', validationSchemas.login, loginController.login);


module.exports = routes;
