const Transaction = require('../models/Transaction')

exports.addTransaction = async req => {
    let transaction = {
        invoiceNr: req.invoiceNr,
        clientUUID: req.clientUUID,
        tagUUID: req.tag
    }
    if (req.payment) {
        transaction.amount = req.payment
        transaction.status = 'payed'
        await new Transaction(transaction).save()
    }
    else if (req.payments) {
        transaction.amount = req.total - req.payments.reduce((a,b) => a + b, 0)
        transaction.status = 'future'
    }

    if (transaction.status === 'future') {
        let result = await Transaction.find({invoiceNr: transaction.invoiceNr, status: 'future'})
        if (result.length > 0) {
            await Transaction.findOneAndUpdate({_id: result._id}, {amount: transaction.amount}, {new: true})
        }
        else {
            await new Transaction(transaction).save()
        }
    }
}