const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile'],
  }));

router.get( '/google/failure', (req, res) => {
  console.log('hej')
    res.redirect('http://localhost:3000/login');
});

router.get('/google/callback', // NOTE changed for auth troubleshoot
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/products',
    failureRedirect: 'auth/google/failure',
  }));

  module.exports = router;
