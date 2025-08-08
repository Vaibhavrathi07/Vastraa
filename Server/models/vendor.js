const mongoose = require('mongoose');
const { Schema } = mongoose;

const VendorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  storeName: {
    type: String,
    required: true
  },
  storeDescription: String,
  phone: String,
  address: String,
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;
