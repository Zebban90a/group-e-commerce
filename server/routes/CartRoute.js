const express = require('express');
const { isLoggedIn } = require('../middleware/authentication');
const {
  addToCart, GetCart,
} = require('../controllers/CartController');

const router = express.Router();
router
  .route('/')
  .post(isLoggedIn, addToCart);

router
  .route('/:id')
  .get(GetCart);

module.exports = router;
