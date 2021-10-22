require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/UserModel');

passport.serializeUser((user, cb) => {
  console.log('passport.js row 7/ serializeUser / incoming user data below');
  console.log(`PASSPORT TESTAR${user}`);
  cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
  // NOTE for auth troubleshoot
  // Not sure if finding in db is needed
  const existingUser = await User.find({ googleId: user.id });
  console.log('passport.js row 16/ deserializeUser / incoming user below');
  console.log(user);
  if (existingUser.length > 0) {
    console.log('passport.js row 19/ deserializeUser / found the user above in db, returning db-doc ');
    return cb(false, existingUser);
  }
  // ...........................
  console.log('passport.js row 23/ deserializeUser / returning found user above');
  cb(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true,
},
(async (request, accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.find({ googleId: profile.id });
    console.log('passport.js row 35/ new GoogleStrategy / found user in db below');
    console.log(existingUser);
    if (existingUser.length > 0) {
      console.log('passport.js row 39/ returning existing user above');
      return done(false, existingUser);
    }
    const fullName = Object.values(profile.name).join(' ');
    console.log('passport.js row 43/ creating new user');
    const newUser = await User.create({
      fullName,
      googleId: profile.id,
      email: profile.email,
    });
    console.log('passport.js row 49/ creating new user success, returning new user');
    return done(false, newUser);
  } catch (error) {
    console.log('passport.js row 52/ creating new user failed');
    return done(error, null);
  }
})));

module.exports = passport;
