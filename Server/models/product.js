const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  vendorId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Vendor', 
    required: false 
  },
  images: { type: [String], required: true }, // Changed from 'image' to 'images'
  category: { 
    type: String, 
    ref: 'Category', 
    required: true 
  },
  subCategory: { 
    type: String, 
    ref: 'SubCategory', 
    required: true 
  },
   

  sizes: { type: [String], required: true },
  colors: { type: [String], required: true },
  bestSeller: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  }
}, { 
  timestamps: true,
  versionKey: false 
});

module.exports = mongoose.model('Product', ProductSchema);