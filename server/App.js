const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

// Middleware
const UserRoute = require('./routes/UserRoute');
const OrderRoute = require('./routes/OrderRoute');
const ProductRoute = require('./routes/ProductRoute');
const AuthRoute = require('./routes/AuthRoute');

// Config
const passport = require('./config/passport');
const session = require('./config/session');

// App Use
app.use(cors({ origin: process.env.CLIENT }));

app.use(session);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', UserRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/products', ProductRoute);
app.use('/auth', AuthRoute);

app.get('*', (req, res) => {
  res.status(404).send('Nothing here..')
});

module.exports = app;