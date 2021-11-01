const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get('/isloggedin', ((req, res) => {
  console.log('isloggedin')
  console.log(req)
  console.log(req.user)
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
  res.redirect('https://group-e-commerce-client.herokuapp.com/login');
});

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'https://group-e-commerce-client.herokuapp.com',
    failureRedirect: 'auth/google/failure',
  }));

router.get('/logout', (req, res) => {
  console.log('logout')
  req.session.destroy(null);
  res.redirect('https://group-e-commerce-client.herokuapp.com/login');
});

module.exports = router;
