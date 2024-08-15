// Imports 
const userService = require('../services/user-service');

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Get User By Id
exports.getUserById = async (req, res) => {
    const id = req.body.userId;
    try {
        const user = await userService.getOneUser(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    };
};