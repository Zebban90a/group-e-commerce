const session = require('express-session');
require('dotenv').config();

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  path: '/',
  /* httpOnly: true, */
  /* secure: false, */
  maxAge: null,
});
