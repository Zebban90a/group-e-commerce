const express = require('express');
const { isLoggedIn } = require('../middleware/authentication');
const {
  addToCart, getCart,removeProduct
} = require('../controllers/CartController');

const router = express.Router();
router
  .route('/')
  .post(isLoggedIn, addToCart)
  .get(isLoggedIn, getCart)
  .delete(isLoggedIn,removeProduct);



module.exports = router;
