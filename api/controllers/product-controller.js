// Imports 
const productService = require('../services/product-service');

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Add New Product 
exports.addProduct = async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productService.addProduct(product);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Edit Product 
exports.editProduct = async (req, res) => {
    const id = req.body.productId;
    const product = req.body;

    try {
        const editedProduct = await productService.editProduct(id, product);
        res.status(200).json(editedProduct);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Delete Product 
exports.deleteProduct = async (req, res) => {
    const id = req.body.productId;
    try {
        const deletedProduct = await productService.deleteProduct(id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json(error);
    };
};