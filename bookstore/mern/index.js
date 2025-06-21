import { config } from 'dotenv'
import { resolve } from 'path'
import cors from 'cors'
import express from 'express'
import { connect } from './shared/db.js'
import { errorMiddleware } from './middleware/index.js'
import apiRouter from './routes/index.js'
import serve from './shared/serve.js'
import { LOCAL_PORT } from './shared/constants.js'

config()
const port = process.env.PORT || LOCAL_PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve('client', 'build')))
  app.get('*', serve)
}

app.use(errorMiddleware)

async function bootstrap() {
  try {
    await connect(() =>
      app.listen(port, () => console.log(`Сервер запущен на порту ${port}`))
    )
  } catch (e) {
    console.log(`Ошибка сервера: ${e.message}`)
    process.exit(1)
  }
}

bootstrap().then()
