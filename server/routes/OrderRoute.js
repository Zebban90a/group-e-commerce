const express = require('express');
const {
  updateOrderStatus,
  findAllOrders,
} = require('../controllers/OrderController');
const { isAdmin } = require('../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .get(findAllOrders);

router
  .route('/:id')
  .patch(isAdmin, updateOrderStatus);

module.exports = router;
