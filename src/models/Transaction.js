const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)
