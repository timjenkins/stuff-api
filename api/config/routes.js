const express = require('express');
const productController = require('../controllers/productController');
const listController = require('../controllers/listController');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const scraperController = require('../controllers/scraperController');
const validationSchemas = require('./validationSchemas');

const routes = express.Router();

// Products
// -----------------------------------------
// Create New Product
routes.post('/products', validationSchemas.product, productController.new);
// Get one Product
routes.get('/products/:id', validationSchemas.productId, productController.one);
// Update Product
routes.patch('/products/:id', validationSchemas.productUpdate, productController.update);
// Delete Product
routes.delete('/products/:id', validationSchemas.productId, productController.delete);


// Lists
// -----------------------------------------
// get all
routes.get('/lists', listController.all);
// Create New List
routes.post('/lists', validationSchemas.list, listController.new);
// Get one List
routes.get('/lists/:id', validationSchemas.listId, listController.one);
// Update one List
routes.patch('/lists/:id', listController.update);
// Delete one List
routes.delete('/lists/:id', listController.delete);


// User
// -----------------------------------------
// Create New User
routes.post('/signup', validationSchemas.user, userController.new);
// Get User Info
routes.get('/users/:id', validationSchemas.userId, userController.one);
// Get All Users
routes.get('/users', userController.all);


// Login
// -----------------------------------------
// check email + password
routes.post('/login', validationSchemas.login, loginController.login);

// Scraper
// -----------------------------------------
// takes product url and returns data
routes.post('/product-url', validationSchemas.productUrl, scraperController.scraper);

module.exports = routes;
