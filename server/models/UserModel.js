const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String,
});

const ContactInfoSchema = mongoose.Schema({
  tel: Number,
  address: {
    type: AddressSchema,
    required: true,
  },
});

const RoleSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contactInfo: ContactInfoSchema,
  roles: RoleSchema,
});

module.exports = mongoose.model("User", UserSchema);
