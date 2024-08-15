// Imports 
const Category = require('../models/Category');

// Get All Categories
exports.getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
};

// Add New Category
exports.addCategory = async category => {
    const newCategory = new Category(category);
    return await newCategory.save();
};

// Edit Category
exports.editCategory = async (id, category) => {
    const edittedCategory = await Category.findOneAndUpdate({
        _id: id
    },
        category
    );
    return edittedCategory;
};

// Delete Category
exports.deleteCategory = async id => {
    const category = await Category.findOneAndDelete({
        _id: id
    });
    return category;
};