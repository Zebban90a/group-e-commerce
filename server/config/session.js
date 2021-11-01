const session = require('express-session');
require('dotenv').config();

/* module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  path: '/',
  maxAge: null,
  cookie: {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  }
}); */
module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 30
  }
});
