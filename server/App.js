require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
const UserRoute = require('./routes/UserRoute');
const OrderRoute = require('./routes/OrderRoute');
const ProductRoute = require('./routes/ProductRoute');
const AuthRoute = require('./routes/AuthRoute');
const CartRoute = require('./routes/CartRoute');
const CheckoutRoute = require('./routes/CheckoutRoute');

// Config
const passport = require('./config/passport');
const session = require('./config/session');

// App Use
// { origin: process.env.CLIENT } // NOTE removed temoporarily for auth troubleshoot
app.use(cors());

app.use(session);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/images', express.static('images'));

app.use('/api/users', UserRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/products', ProductRoute);
app.use('/api/addtocart', CartRoute);
app.use('/api/checkout', CheckoutRoute);
app.use('/api/cart', CartRoute);
app.use('/auth', AuthRoute);

/* app.get('*', (req, res) => {
  res.status(404).send('Nothing here..')
}) */

module.exports = app;
