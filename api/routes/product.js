// Path
const express = require('express');

// Imports 
const productController = require('../controllers/product-controller');

// Router
const router = express.Router();

// Get All Products
router.get('/get-all', productController.getAllProducts);

// Add New Product
router.post('/add-product', productController.addProduct);

// Edit Product 
router.put('/update-product', productController.editProduct);

// Delete Product
router.delete('/delete-product', productController.deleteProduct);

module.exports = router;
