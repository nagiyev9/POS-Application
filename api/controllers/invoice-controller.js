// Imports 
const invoiceService = require('../services/invoice-service');

// Get All Invoices 
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoiceService.getAllInvoices();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Add New Invoice 
exports.addInvoice = async (req, res) => {
    const invoice = req.body;
    try {
        const newInvoice = await invoiceService.addInvoice(invoice);
        res.status(200).json(newInvoice);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Edit Invoice 
exports.editInvoice = async (req, res) => {
    const id = req.body.invoiceId;
    const invoice = req.body;
    try {
        const edittedInvoice = await invoiceService.editInvoice(id, invoice);
        res.status(200).json(edittedInvoice);
    } catch (error) {
        res.status(500).json(error);
    };
};

// Delete invoice 
exports.deleteInvoice = async (req, res) => {
    const id = req.body.invoiceId;
    try {
        const invoice = await invoiceService.deleteInvoice(id);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json(error);
    };
};