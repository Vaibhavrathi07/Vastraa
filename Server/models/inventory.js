const mongoose = require('mongoose');
const { Schema } = mongoose;

const InventorySchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantityAvailable: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  warehouseLocation: String
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
