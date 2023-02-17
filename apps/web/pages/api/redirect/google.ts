import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "../../../Resources/lib/passport-google-auth";
import session from 'express-session'
import jwt from "jsonwebtoken"




const secret = 'martinaandritaarethebest'




export default nextConnect().use(
  session({
    secret: "martinaandrita",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000   // 1 hour
    }
  })
)
  .get(
    passport.authenticate("google"),
    (req: NextApiRequest & { user: any }, res: NextApiResponse) => {
      //@ts-ignore
      const user = req.user;                                              //req.session.user can be used
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' })
      console.log('token', token)
      console.log('user', user)
      // setCookie('jwt', token, { httpOnly: true, maxAge: 3600000 })
      res.redirect("/");
    }
  );
