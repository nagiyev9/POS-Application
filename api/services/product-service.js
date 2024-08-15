// Imports
const Product = require('../models/Product');

// Get All Products
exports.getAllProducts = async () => {
    return await Product.find();
};

// Add New Product
exports.addProduct = async product => {
    const newProduct = await new Product(product);
    return await newProduct.save();
};

// Update Product 
exports.editProduct = async (id, product) => {
    const editedProduct = await Product.findOneAndUpdate({
        _id: id
    },
        product
    );
    return editedProduct;
};

// Delete Product 
exports.deleteProduct = async id => {
    const product = await Product.findOneAndDelete({
        _id: id
    });
    return product;
};