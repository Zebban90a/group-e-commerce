const passport = require('passport');
const express = require('express');
const isLoggedIn = require('../middleware/authentication');

const router = express.Router();

router.get('/isloggedin', ((req, res) => {
  if (req.user) {
    console.log('You are logged in!');
    res.send(true);
    res.end();
   /*  console.log('next');
    next(); */
  } else {
    console.log('not logged in!');
    res.send(false);
    res.end();
    // res.redirect('http://localhost:3000/login');
  }
}));

router.get('/isadmin', ((req, res) => {
  const { user } = req;
  if (user && user.roles && user.roles.includes('admin')) {
    console.log('You are logged in as admin!');
    res.send(true);
    res.end();
  } else {
    console.log('not logged in as admin!');
    res.send(false);
    res.end();
  }
}));

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile'],
  }));

router.get('/google/failure', (req, res) => {
  console.log('hej');
  res.redirect('http://localhost:3000/login');
});

router.get('/google/callback', // NOTE changed for auth troubleshoot
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'auth/google/failure',
  }));

/* app.get('/login', (req, res) => {
  console.log('login')
}) */
router.get('/logout', (req, res) => {
  req.session.destroy(null);
  res.redirect('http://localhost:3000/login');
});

module.exports = router;
