require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
const UserRoute = require('./routes/UserRoute');
const OrderRoute = require('./routes/OrderRoute');
const ProductRoute = require('./routes/ProductRoute');
const AuthRoute = require('./routes/AuthRoute');
const CheckoutRoute = require('./routes/CheckoutRoute');

// Config
const passport = require('./config/passport');
const session = require('./config/session');

// App Use
app.use(cors({
  origin: process.env.CLIENT,
}));

console.log('change cors 12:44');
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(session);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
console.log('app.js')
app.use('/api/users', UserRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/products', ProductRoute);
app.use('/api/checkout', CheckoutRoute);
app.use('/auth', AuthRoute);

module.exports = app;
