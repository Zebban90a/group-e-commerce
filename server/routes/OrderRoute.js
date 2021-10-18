const express = require('express');
const {
  createOrder,
  updateOrderStatus, // Admin Only
  findAllOrders,
} = require('../controllers/OrderController');

const router = express.Router();

router
  .route('/')
  .get(findAllOrders)
  .post(createOrder);

router
  .route('/:id')
  .patch(updateOrderStatus);

module.exports = router;
