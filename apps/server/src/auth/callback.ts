import { Request, Response, NextFunction } from "express";
import passport = require("passport");
import { setCookies } from "cookies"

async function googleCallback(req: Request, res: Response, next: NextFunction) {
  await passport.authenticate('google', (err, user, info) => {
    if (err || !user) res.redirect('http://localhost:3000/?a=auth_fail')

    setCookies('token', info.token, { req, res })
    res.redirect("http://localhost:3000/dashboard")
  })
}

export default googleCallback