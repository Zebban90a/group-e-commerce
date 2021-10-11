const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String,
});

const ContactInfoSchema = mongoose.Schema({
  tel: [Number],
  email: [String],
  address: {
    type: AddressSchema,
    required: true,
  }
});

const RoleSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  connectInfo: ContactInfoSchema,
  roles: RoleSchema
})

module.exports = mongoose.model('User', UserSchema);