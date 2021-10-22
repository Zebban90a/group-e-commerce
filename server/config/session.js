const session = require('express-session');
require('dotenv').config();

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  // NOTE for auth troubleshoot, src https://stackoverflow.com/a/23119369/7739243
  // ,secure: false // didn't help at the time, commented for duplicate below

  // NOTE for auth troubleshoot, src https://www.npmjs.com/package/express-session
  path: '/',
  httpOnly: true,
  secure: false,
  maxAge: null,
});
