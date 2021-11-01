const session = require('express-session');
require('dotenv').config();

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy : true,
  cookie: {
    secure : true,
    maxAge: 1000 * 30,
  }
});
