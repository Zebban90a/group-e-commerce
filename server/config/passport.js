require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require("../models/UserModel");

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      const existingUser = await User.find({ googleId: profile.id });
      
      if (existingUser.length > 0) {
        return done(false, existingUser);
      }
      else {
        const fullName = Object.values(profile.name).toString().replace(',', ' ');
        
        const newUser = await User.create({
          'fullName': fullName,
          'googleId': profile.id,
          'email': profile.email
        });
        return done(false, newUser);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;