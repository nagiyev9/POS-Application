// Imports
const User = require('../models/User');

// Get All Users
exports.getAllUsers = async () => {
    return await User.find();
};

// Get User By Email
exports.getUserByEmail = async email => {
    const user = await User.findOne({ email });
    return user;
};

// Get User By Id
exports.getOneUser = async id => {
    const user = await User.findById(id);
    return user;
};