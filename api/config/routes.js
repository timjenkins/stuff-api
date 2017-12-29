const express = require('express');
const linkController = require('../controllers/linkController');

const routes = express.Router();

// Links
// -----------------------------------------
// get all
routes.get('/links', linkController.all);
// Create New Link
routes.post('/links', linkController.new);
// Get one link
routes.get('/links/:id', linkController.one);


module.exports = routes;
