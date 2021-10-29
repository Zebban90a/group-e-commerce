const mongoose = require('mongoose');
const moment = require('moment');

const OrderAddressSchema = mongoose.Schema({
  zip: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: Number,
    required: true,
  },
  _id: false,
});

const CartItem = mongoose.Schema({
  id: {
    required: true,
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const OrderSchema = mongoose.Schema({
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cart: [CartItem],
  orderTotal: {
    type: Number,
    required: true,
  },
  freight: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
    min: 0,
    max: 3,
  },
  date: {
    type: Date,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  shippingAddress: OrderAddressSchema,
});

module.exports = mongoose.model('Order', OrderSchema);
