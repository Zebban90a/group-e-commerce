const express = require('express');
const { isLoggedIn } = require('../middleware/authentication');
const {
  addToCart, getCart
} = require('../controllers/CartController');

const router = express.Router();
router
  .route('/')
  .post(isLoggedIn, addToCart)
  .get(isLoggedIn, getCart);



module.exports = router;
