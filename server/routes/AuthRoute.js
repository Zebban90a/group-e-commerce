const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get('/isloggedin', ((req, res) => {
  if (req.user) {
    res.send(true);
    res.end();
  } else {
    res.send(false);
    res.end();
  }
}));

router.get('/isadmin', ((req, res) => {
  const { user } = req;
  if (user && user.roles && user.roles.includes('admin')) {
    res.send(true);
    res.end();
  } else {
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
  res.redirect('http://localhost:3000/login');
});

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'auth/google/failure',
  }));

router.get('/logout', (req, res) => {
  req.session.destroy(null);
  res.redirect('http://localhost:3000/login');
});

module.exports = router;
