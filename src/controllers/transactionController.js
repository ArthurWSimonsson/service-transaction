const Transaction = require('../models/Transaction')

// Adds a transaction to the transaction database
exports.addTransaction = async req => {
    if(req.payment) {
        return await payedTransaction(req);
    }
    else if(req.payments) {
        return await futureTransaction(req);
    }
    return {};
}

// Removes a transaction from the transaction database 
exports.removeTransaction = async req => {
    return await Transaction.deleteOne({invoiceNr: req.invoiceNr});
}

// Sets a new amount to a transaction
exports.setTransactionAmount = async req => {
    return await Transaction.findOneAndUpdate({invoiceNr: req.invoiceNr}, {amount: req.amount}, {new: true});
}

// Adds transaction that has been payed
payedTransaction = async req => {
    let transaction = {
        invoiceNr: req.invoiceNr,
        clientUUID: req.clientUUID,
        tagUUID: req.tag
    }
    transaction.amount = req.payment;
    transaction.status = 'payed';
    await new Transaction(transaction).save();

    return {new: true}
}

// Adds future transaction
futureTransaction = async req => {
    let transaction = {
        invoiceNr: req.invoiceNr,
        clientUUID: req.clientUUID,
        tagUUID: req.tag
    }

    transaction.amount = req.total - req.payments.reduce((a,b) => a + b, 0);
    transaction.status = 'future';

    let result = await Transaction.find({invoiceNr: transaction.invoiceNr, status: 'future'});
    if (result.length > 0) {
        await Transaction.findOneAndUpdate({_id: result._id}, {amount: transaction.amount}, {new: true});
        return {new: false, old: result}
    }
    else
        await new Transaction(transaction).save();
    return {new: true}
}