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
  origin: [process.env.CLIENT, process.env.CLOUDINARY_URL, 'https://res.cloudinary.com'],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  credentials: true,
}));

app.use(session);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/users', UserRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/products', ProductRoute);
app.use('/api/checkout', CheckoutRoute);
app.use('/auth', AuthRoute);

module.exports = app;
