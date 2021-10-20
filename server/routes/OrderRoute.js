const express = require('express');
const {
  createOrder,
  updateOrderStatus, // Admin Only
  findAllOrders,
  addToCart,
} = require('../controllers/OrderController');

const router = express.Router();

router
  .route('/')
  .get(findAllOrders)
  .post(createOrder);

router
  .route('/:id')
  .patch(updateOrderStatus);

router
  .route('/addtocart')
  .post(addToCart);
module.exports = router;
