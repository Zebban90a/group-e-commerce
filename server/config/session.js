const session = require('express-session');
require('dotenv').config();

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy : true,
  cookie: {
    sameSite: 'none',
    httpOnly: true,
    secure : true,
    expires: Date.now()+ 86400*1000,
  }
});
