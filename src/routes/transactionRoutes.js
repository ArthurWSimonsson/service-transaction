const transactionController = require('../controllers/transactionController')

const routes = async (app, options) => {
    app.post('/api/transaction', async (request, reply) => {
        try {
            // console.log(request.body)

            await transactionController.addTransaction(request.body)

            reply.send({
                status: 200,
                msg: 'Transaction Completed'
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