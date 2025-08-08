const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: String,
  reviewDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending'
  }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
