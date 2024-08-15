// Imports
const User = require('../models/User');
const userService = require('../services/user-service');
const bcrypt = require('bcrypt');

// Login
exports.loginUser = async (req, res) => {
    const user = req.body;
    const { email, password } = user;
    try {

        const checkExist = await userService.getUserByEmail(email);

        if (!checkExist) {
            return res.status(404).json('User Not Found');
        }

        const validPassword = await bcrypt.compare(password, checkExist.password);

        if (!validPassword) {
            return res.status(403).json('Invalid Password');
        }

        res.status(200).json(checkExist);
        
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ message: error.message })
    }
};

// Register
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const checkExist = await userService.getUserByEmail(email);

        if (checkExist) {
            return res.status(403).json({ message: 'This Email Registered Before' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(200).json({ message: 'New User Created Successfully' });
    } catch (error) {
        console.error('Error in registration:', error.message); 
        res.status(500).json({ message: error.message });
    }
};