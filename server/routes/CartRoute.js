const express = require('express');
const { isLoggedIn } = require('../middleware/authentication');
const {
  addToCart,
} = require('../controllers/CartController');

const router = express.Router();
router
  .route('/')
  .post(isLoggedIn, addToCart);

module.exports = router;
