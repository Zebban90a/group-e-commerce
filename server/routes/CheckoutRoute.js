const express = require('express');

const { placeOrder } = require('../controllers/CheckoutController');

const router = express.Router();

router
  .route('/')
  .get()
  .post(placeOrder);

module.exports = router;
