const mongoose = require('mongoose');

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

const OrderContactInfoSchema = mongoose.Schema({
  tel: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  _id: false,
});

const OrderSchema = mongoose.Schema({
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: Number,
    productPrice: Number,
    _id: false,
  }],
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
  address: OrderAddressSchema,
  contact: OrderContactInfoSchema,
});

module.exports = mongoose.model('Order', OrderSchema);
