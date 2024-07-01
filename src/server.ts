import { env } from './env'
import { app } from './app'

app
  .listen({
    port: env.PORT || 3000,
  })
  .then(() => {
    console.log('HTTP server running')
  })
