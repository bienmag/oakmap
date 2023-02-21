import express from 'express'
import mongoose from 'mongoose'
import router from './src/router'
import { Server } from 'http'
import Logger from './src/lib/logger'



import dotenv from 'dotenv'
dotenv.config()


import { MONGODB_DB, MONGODB_URL, PORT } from './src/lib/constants'

const app = express()
const cors = require('cors')




app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*',
  })
)

app.use(express.json())
app.use(cors())

app.use(router)



export function startServer(): Server {
  const port = PORT || 8080

  console.log('Connecting to database', MONGODB_URL, '...')
  mongoose
    .connect(MONGODB_URL, { dbName: MONGODB_DB })
    .then(() => console.log('✅ Database connection successful'))
    .catch((error) => console.error(error))

  const server = app.listen(port, () => {
    Logger.info(
      `🧨🫡  Server running and listening on http://localhost:${port}/`
    )
  })
  process.on('SIGTERM', () => {
    server.close()
  })
  return server
}

export default app
