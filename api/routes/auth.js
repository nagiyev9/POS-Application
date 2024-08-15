// Path
const express = require('express');

// Imports 
const authController = require('../controllers/auth-controller');
const { validate_register, handle_validation_errors } = require('../middlewares/validations/validation');

// Router
const router = express.Router();

router.post('/register', validate_register, handle_validation_errors, authController.registerUser);

router.post('/login', authController.loginUser);

module.exports = router;
 