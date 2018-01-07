const express = require('express');
const linkController = require('../controllers/linkController');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

const routes = express.Router();

// Links
// -----------------------------------------
// get all
routes.get('/links', linkController.all);
// Create New Link
routes.post('/links', linkController.new);
// Get one link
routes.get('/links/:id', linkController.one);


// User
// -----------------------------------------
// Create New User
routes.post('/signup', userController.new);


// Login
// -----------------------------------------
// check email + password
routes.post('/login', loginController.login);


module.exports = routes;
