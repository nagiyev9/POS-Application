// Path
const express = require('express');

// Imports 
const categoryController = require('../controllers/category-controller');

// Router
const router = express.Router();

// Get All Categories
router.get('/get-all', categoryController.getAllCategories);

// Add New Category
router.post('/add-category', categoryController.addCategory);

// Edit Category
router.put('/update-category', categoryController.editCategory);

// Delete Category
router.delete('/delete-category', categoryController.deleteCategory);

module.exports = router;
