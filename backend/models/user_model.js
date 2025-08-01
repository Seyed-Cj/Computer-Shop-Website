const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  family: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  addresses: [{ type: String }],
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  lastLogin: Date,
  cart: [{ productId: Schema.Types.ObjectId, quantity: Number }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  whishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  loyaltyPoints: { type: Number, default: 0 },
}, { timestamps: true });

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true},
  role: { type: String, enum: ['superadmin', 'productManager', 'orderManager', 'userManager'], required: true },
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  lastLogin: Date,
  activityLog: [{ action: String, date: Date }],
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  Admin: mongoose.model('Admin', adminSchema)
};