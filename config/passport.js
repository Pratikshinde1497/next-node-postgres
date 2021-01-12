const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config({ path: "./config/config.env"})
const { authenticateGoogleUser } = require("../middlewares/services/authentication_client")

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done)=> {

    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        provider: profile.provider
      }

      //  user authentication service

      await authenticateGoogleUser(newUser)
          .then(res => done(null, res))
          .catch(err => {
            if (err.code === 14) {
              console.log("Authentication Server not running: 500");
              done("Authentication Server not running: 500", null)
            }
          })
    })
  )

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });
}
