
import passport from "passport";
import { Request, Response, NextFunction } from "express";

async function authenticateWithGoogle(req: Request, res: Response, next: NextFunction) {
  await passport.authenticate('google', {
    scope: ["profile", "email"],
    session: false
  })(req, res, next)
}


export default authenticateWithGoogle