
import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import router from "./router";
import { Server } from 'http'
import Logger from "./lib/logger";



dotenv.config()

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

  mongoose.connect("mongodb+srv://bienmag:12345@oakmap.kjrgfwk.mongodb.net/?retryWrites=true&w=majority").then(() =>
    console.log("✅ Database connection successful")).catch(() => console.log("database connection error")
    )

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

// app.listen(port, () => {
//   TreesController.createTree
//   console.log(`🦸🏽 [server]: Server is running at ${port}`)
// })



export default app