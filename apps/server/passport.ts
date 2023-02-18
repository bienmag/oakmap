import passport from "passport";
const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser(function (user, done) {
  done(null, user);
});


const GOOGLE_CLIENT_ID = "1011566304996 - qp7tecc8v921pfdlv7ta6i5hu2umaad2.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = " GOCSPX - CU7jYvNtKau_aSGQQL0rU - VPoIsw"
const GOOGLE_CB = "http://localhost:3000/google/callback"

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CB,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));