// Path
const express = require('express');

// Imports 
const userController = require('../controllers/user-controller');

// Router
const router = express.Router();

// Get All Users
router.get('/get-all', userController.getAllUsers);

// Get One User By ID
router.get('/', userController.getUserById);

module.exports = router;
