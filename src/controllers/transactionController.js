const Transaction = require('../models/Transaction')

exports.addTransaction = async req => {
    let transaction = {
        invoiceNr: req.invoiceNr,
        clientUUID: req.clientUUID
    }
    if (req.payment) {
        transaction.amount = req.payment
        transaction.status = 'payed'
    }
    else if (req.payments) {
        transaction.amount = req.total - req.payments.reduce((a,b) => a + b, 0)
        transaction.status = 'future'
    }

    await new Transaction(transaction).save()
}