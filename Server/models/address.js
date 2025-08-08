const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['shipping', 'billing'],
    default: 'shipping'
  },
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  isDefault: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: String,
    required: true
  },

}, { timestamps: true });

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
