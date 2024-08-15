// Imports
const categoryService = require('../services/category-service');

// Get All Categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Add New Category
exports.addCategory = async (req, res) => {
    const category = req.body;
    try {
        const newCategory = await categoryService.addCategory(category);
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Edit Category 
exports.editCategory = async (req, res) => {
    const id = req.body.categoryId;
    const category = req.body;
    try {
        const edittedCategory = await categoryService.editCategory(id, category);
        res.status(200).json(edittedCategory);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Delete Category 
exports.deleteCategory = async (req, res) => {
    const id = req.body.categoryId;
    try {
      const category = await categoryService.deleteCategory(id);
      res.status(200).json(category);  
    } catch (error) {
        res.status(500).json(error);
    };
};