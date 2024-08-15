// Imports 
const Invoice = require('../models/Invoice');

// Get All Invoices
exports.getAllInvoices = async () => {
    const invoices = await Invoice.find();
    return invoices;
};

// Add New Invoice 
exports.addInvoice = async invoice => {
    const newInvoice = await new Invoice(invoice);
    return newInvoice.save();
};

// Edit Invoice 
exports.editInvoice = async (id, invoice) => {
    const edittedInvoice = await Invoice.findOneAndUpdate({
        _id: id
    },
        invoice
    );
    return edittedInvoice;
};

// Delete Invoice 
exports.deleteInvoice = async id => {
    const invoice = await Invoice.findOneAndDelete({
        _id: id
    });
    return invoice;
};