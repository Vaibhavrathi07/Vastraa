const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shippingAddress: String,
  billingAddress: String,
  phone: String
}, { timestamps: true });

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
