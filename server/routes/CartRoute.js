const express = require('express');
const {
  addToCart,
} = require('../controllers/CartController');

const router = express.Router();
router
  .route('/addtocart')
  .post(addToCart);
module.exports = router;
