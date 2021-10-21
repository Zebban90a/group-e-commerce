const express = require('express');

const {GetCart} = require('../controllers/CheckoutController');

const router = express.Router();

router
.route('/:id')
.get(GetCart);

module.exports = router;
