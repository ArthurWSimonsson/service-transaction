const transactionController = require('../controllers/transactionController')
const tagController = require('../controllers/tagController')

const routes = async (app, options) => {
    app.post('/api/transaction', async (request, reply) => {
        try {
            let tag = await tagController.requestTagUUID()

            request.body.tag = tag.tag.uuid;

            console.log('req is ', request.body)

            let data = await transactionController.addTransaction(request.body)

            reply.send({
                status: 200,
                msg: 'Transaction Completed',
                data: data
            })
        }
        catch(err) {
            reply.code(400).send({
                status: 400,
                msg: 'Transaction Error',
                err: err.message
            })
        }
    })

    app.post('/api/transaction/amount/set', async (request, reply) => {
        try {
            let tag = await tagController.requestTagUUID()

            request.body.tag = tag.tag.uuid;

            console.log('req is ', request.body)

            let data = await transactionController.setTransactionAmount(request.body)

            reply.send({
                status: 200,
                msg: 'Transaction Completed',
                data: data
            })
        }
        catch(err) {
            reply.code(400).send({
                status: 400,
                msg: 'Transaction Error',
                err: err.message
            })
        }
    })

    app.delete('/api/transaction', async (req, reply) => {
        try {
            console.log('req is ', req.body)

            await transactionController.removeTransaction(request.body)

            reply.send({
                status: 200,
                msg: 'Transaction Removed'
            })
        }
        catch(err) {
            reply.code(400).send({
                status: 400,
                msg: 'Transaction Error',
                err: err.message
            })
        }
    })
}

module.exports = routes