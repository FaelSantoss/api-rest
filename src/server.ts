import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import fastifyCookie from '@fastify/cookie'
import crypto from 'crypto'

const app = fastify()

app.register(fastifyCookie, {
  secret: 'your-secret-key',
})

app.addHook('preHandler', (request, reply, done) => {
  if (!request.cookies.sessionId) {
    const sessionId = crypto.randomUUID()
    reply.setCookie('sessionId', sessionId, {
      path: '/',
      httpOnly: true,
    })
  }
  done()
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running')
  })
