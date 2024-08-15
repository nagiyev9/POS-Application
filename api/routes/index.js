// Path
const express = require('express');

// Imports 
const userRouter = require('./user');
const productRouter = require('./product');
const invoiceRouter = require('./invoice');
const categoryRouter = require('./category');
const authRouter = require('./auth');

// Router
const router = express.Router();

// Users
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/invoice', invoiceRouter);
router.use('/category', categoryRouter);
router.use('/auth', authRouter);

module.exports = router;