// Path
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');

// Imports
const { connect } = require('./database/db');

// Dotenv Config
dotenv.config();

// App
const app = express();

// Port
const PORT = process.env.PORT;

// Routes' Path
const MainRouter = require('./routes');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

// Routes
app.use('/api', MainRouter);

// Listen
app.listen(PORT, () => {
    connect();
    console.log(`Server is working on ${PORT} port`);
})