const mongoose = require('mongoose')

// Transaction schema
const transactionSchema = new mongoose.Schema({
    amount: Number,
    status: {
        type: String,
        enum: ['payed', 'future']
    },
    invoiceNr: {
        type: Number,
        required: true
    },
    clientUUID: {
        type: String,
        required: true
    },
    tagUUID: {
        type: String
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)
