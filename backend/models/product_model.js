const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  realName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  brand: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  specs: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  images: [{ type: String }],
  stock: { type: Number, min: 0, default: 0 },
  discountPercent: { type: Number, min: 0, max: 100, default: 0 },
  discountAmount: { type: Number, min: 0, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);