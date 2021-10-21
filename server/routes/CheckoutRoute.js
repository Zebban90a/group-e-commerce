const express = require('express');

const {GetCart} = require('../controllers/CheckoutController');

const router = express.Router();

router
.route('/')
.get(GetCart);

module.exports = router;
