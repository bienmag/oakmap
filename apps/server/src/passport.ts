import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from "./lib/constants";
import { DBUser } from "./lib/mongo";
import jwt from "jsonwebtoken"
import User from "./Models/Users";
import { ObjectId } from "mongodb"
const mongodb = require('mongodb');



const GOOGLE_CB = "http://localhost:3000/google/callback"



passport.use(
  'google',
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CB
  }, async (accessToken, refreshToken, profile, done) => {

    try {
      // check if we have the user in our DB
      const user = await DBUser.findOne({ email: profile.email })


      if (!user) {
        // create new user
        const _id = new ObjectId()
        const tokens: string[] = []
        const newUser: User = await User.create(_id, profile.displayName, profile.email, accessToken, tokens)
        if (newUser === null) { return }

        const token = await jwt.sign({ id: newUser._id, created: Date.now().toString() }, JWT_SECRET)
        console.log(newUser)
        // need to update
        newUser.tokens.push(token)
        const id = mongodb.Object(newUser._id)
        const currrentUser = await DBUser.findById({ _id: id })
        currrentUser?.save()
        //@ts-ignore
        done(null, newUser, { message: "Auth successful", token })

      } else {
        //user exists, sign in 
        const token = await jwt.sign({ id: user._id, created: Date.now().toString() }, JWT_SECRET)
        user.tokens.push(token)
        const id = mongodb.Object(user._id)
        const currrentUser = await DBUser.findById({ _id: id })
        currrentUser?.save()
        //@ts-ignore
        done(null, user, { message: "Auth successful", token })
      }


    } catch (err) {
      console.error(err)
      done(err, false, { message: "Internal server error" })
    }

  }))

process.env.GOOGLE_CLIENT_ID