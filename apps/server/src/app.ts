
import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import router from "./router";
import { Server } from 'http'
import Logger from "./lib/logger";
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





export default app