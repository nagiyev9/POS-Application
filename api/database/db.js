// Path
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
    } catch (error) {
        throw error
    }
}

module.exports = { connect }