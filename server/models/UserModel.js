const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
  street: String,
  houseNumber: String,
  zip: Number,
  city: String
});

const ContactInfoSchema = mongoose.Schema({
  tel: Number,
  address: {
    type: AddressSchema,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contactInfo: ContactInfoSchema,
  roles: {
    type: Array,
    default: 'user',
  },
  cart: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
