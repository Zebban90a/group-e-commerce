require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/UserModel');

passport.serializeUser((user, cb) => {
  return cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
  const existingUser = await User.findOne({
    googleId: user.id,
  });

  if (existingUser) {
    return cb(false, existingUser);
  }
  return cb(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://group-e-commerce.herokuapp.com/auth/google/callback',
  passReqToCallback: true,
},
(async (request, accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({
      googleId: profile.id,
    });

    if (existingUser) {
      return done(false, existingUser);
    }
    const fullName = Object.values(profile.name).join(' ');
    const newUser = await User.create({
      fullName,
      googleId: profile.id,
      email: profile.email,
    });
    return done(false, newUser);
  } catch (error) {
    return done(error, null);
  }
})));

module.exports = passport;
