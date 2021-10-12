const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  created_at:{ 
    type: Date,
    default: new Date
  },
  images: {
    type: Array,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  manufacturer: {
    type: String,
    required: true
  },
  weight: {
    type: Number, // grams
    required: true
  }
})

module.exports = mongoose.model('Product', ProductSchema);