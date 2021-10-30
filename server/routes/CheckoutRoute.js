const express = require('express');
const { isLoggedIn } = require('../middleware/authentication');
const { placeOrder } = require('../controllers/CheckoutController');

const router = express.Router();
console.log('CheckoutRoute');
router
  .route('/')
  .get()
  .post(isLoggedIn, placeOrder);

module.exports = router;
