require("dotenv").config();
const fastify = require('fastify')({
	logger: true
})

fastify.get('/', async (request, reply) => {
	return { hello: 'world' }
  })

fastify.register(require('./routes/transactionRoutes'))


const mongoose = require('mongoose')

mongoose
	.connect(process.env.DB_CONNECT)
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))

module.exports = fastify
