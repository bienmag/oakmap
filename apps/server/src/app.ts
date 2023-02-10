import express from "express";
import mongoose from "mongoose";
import router from "./router";
import { Server } from 'http'
import Logger from "./lib/logger";

import dotenv from 'dotenv'
dotenv.config()

import { MONGODB_DB, MONGODB_URL } from "./lib/constants";


import passport = require("passport");
const expSession = require('express-session')
const bodyParser = require('body-parser')






dotenv.config()
require("./passport")
const app = express()
const cors = require('cors')

app.use(expSession({ secret: 'cats' }))
app.use(bodyParser());
app.use(passport.initialize())
app.use(passport.session())



app.use(cors({
  methods: ['GET', 'POST', 'PUT'],
  origin: "*"
}))

app.use(cors({
  methods: ['GET', 'POST', 'PUT'],
  origin: "*"
}))



app.use(express.json())
app.use(cors())

app.use(router)


app.get("/fail", (req, res) => res.send("You failed log in"))
app.get("/success", (req, res) => res.send("Welcome  mr dev"))

app.get("/google",
  passport.authenticate('google', { scope: ['email', 'profile'] })
)


app.get("/google/callback",
  passport.authenticate('google',
    {
      successRedirect: '/success',
      failureRedirect: '/failed'
    })
)


export function startServer(): Server {
  const port = 8080

  console.log('Connecting to database', MONGODB_URL, '...')
  mongoose.connect(MONGODB_URL, { dbName: MONGODB_DB })
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

<<<<<<< HEAD




=======
>>>>>>> c905883 (feat: create tree, branch, leaf,get a tree, get trees, get markdown)
export default app