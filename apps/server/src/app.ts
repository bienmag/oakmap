import express from "express";
import mongoose from "mongoose";
import router from "./router";
import { Server } from 'http'
import Logger from "./lib/logger";

import dotenv from 'dotenv'
dotenv.config()

import { MONGODB_DB, MONGODB_URL } from "./lib/constants";


const app = express()
const cors = require('cors')

//change to dotenv later

app.use(cors({
  methods: ['GET', 'POST', 'PUT'],
  origin: "*"
}))

app.use(express.json())
app.use(router)


export function startServer(): Server {
  const port = 8080

  console.log('Connecting to database', MONGODB_URL, '...')
  mongoose.connect(MONGODB_URL, {dbName: MONGODB_DB})
  .then(() => console.log("✅ Database connection successful"))
  .catch((error) => console.error(error))

  const server = app.listen(port, () => {
    Logger.info(
      `🧨🫡  Server running and listening on http://localhost:${port}/`
    )
  })
  process.on("SIGTERM", () => {
    server.close()
  })
  return server
}

export default app