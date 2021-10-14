const passport = require('passport');
const express = require("express");
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

/* router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/google/failure'
}));

router.get( '/google/failure', (req, res) => {
    res.send('du har failat');
}); */
router.get("/google/callback",
  passport.authenticate("google", {
      failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    res.redirect("http://localhost:3000/products");
  }
);

module.exports = router;