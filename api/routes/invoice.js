// Path
const express = require('express');

// Imports 
const invoiceController = require('../controllers/invoice-controller');

// Router
const router = express.Router();

// Get All Inovices
router.get('/get-all', invoiceController.getAllInvoices);

// Add New Invoice
router.post('/add-invoice', invoiceController.addInvoice);

//Edit Invoice
router.put('/update-invoice', invoiceController.editInvoice);

// Delete Invoice
router.delete('/delete-invoice', invoiceController.deleteInvoice);

module.exports = router;
