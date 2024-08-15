const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema(
    {
        costumerName: {
            type: String,
            require: true
        },
        costumerNumber: {
            type: String,
            require: true
        },
        paymentMethod: {
            type: String,
            require: true
        },
        cardItems: {
            type: Array,
            require: true
        },
        subTotal: {
            type: Number,
            require: true
        },
        tax: {
            type: Number,
            require: true
        },
        totalAmount: {
            type: Number,
            require: true
        }
    },
    {
        timestamps: true
    }
);

const Invoice = mongoose.model('invoices', InvoiceSchema);

module.exports = Invoice;