import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./lib/constants";
import { DBUser } from "./lib/mongo";
import jwt from "jsonwebtoken"
import User from "./Models/Users";





const GOOGLE_CB = "http://localhost:3000/google/callback"



passport.use(
  'google',
  new Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback",
    scope: ['profile']
  },
    //@ts-ignore
    function verify(accessToken, refreshToken, profile, done) {


      return done(null, profile)

    }))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (profile, done) {
 
  const user: Express.User = {
    id: '123123123',
    name: 'Rita'
  }
  done(null, user)
})

      // }, async (accessToken, refreshToken, profile, done) => {

      // try {
      //   // check if we have the user in our DB
 

      //   const user = await DBUser.findOne({ email: profile.email })
      //   console.log('imhere')


      //   if (!user) {
      //     console.log("user", user)
      //     // create new user
      //     const _id = new ObjectId()
      //     const tokens: string[] = []
      //     const newUser: User = await User.create(_id, profile.displayName, profile.email, accessToken, tokens)
      //     if (newUser === null) { return }


      //     const token = await jwt.sign({ id: newUser._id, created: Date.now().toString() }, JWT_SECRET)
      //     console.log('this is token', token)
      //     console.log(newUser)
      //     // need to update
      //     newUser.tokens.push(token)
      //     const id = mongodb.Object(newUser._id)
      //     const currrentUser = await DBUser.findById({ _id: id })
      //     currrentUser?.save()

      //     console.log('tokens', accessToken, token)
      //     //@ts-ignore
      //     done(null, user, { message: "Auth successful", token });


      //   } else {
      //     //user exists, sign in
      //     const token = await jwt.sign({ id: user._id, created: Date.now().toString() }, JWT_SECRET)
      //     user.tokens.push(token)
      //     const id = mongodb.Object(user._id)
      //     const currrentUser = await DBUser.findById({ _id: id })
      //     currrentUser?.save()
      //     //@ts-ignore
      //     done(null, user, { message: "Auth successful", token });

      //   }


      // } catch (err) {
      //   console.error(err)
      //   done(err, false, { message: "Internal server error" })
      // }

    // }))

