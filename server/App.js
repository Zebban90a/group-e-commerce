const express = require('express');
const app = express();
const cors = require('cors');
const UserRoute = require('./routes/UserRoute');
const OrderRoute = require('./routes/OrderRoute');
const ProductRoute = require('./routes/ProductRoute');
const AuthRoute = require('./routes/AuthRoute');
const passport = require('./config/passport');
const session = require('./config/session');

require("dotenv").config();

app.use(cors({ origin: process.env.CLIENT }));

app.use(session);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', UserRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/products', ProductRoute);
//app.use('/auth', AuthRoute);

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/google/failure'
}));

module.exports = app;
