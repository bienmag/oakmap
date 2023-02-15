import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./lib/constants";
import { DBUser } from "./lib/mongo";
import jwt from "jsonwebtoken"
import User from "./Models/Users";





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
        const newUser = new User({
          id: new ObjectId(),
          user: profile.displayName,
          email: profile.email,
          accessToken
        })

        // await create new user in DB

        const token = 

      } else {
        //user exists, sign in 
      }


    } catch (err) {
      console.error(err)
      done(err, false, { message: "Internal server error" })
    }

  }))

process.env.GOOGLE_CLIENT_ID