const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  specsTemplate: [
    {
      key: { type: String, required: true },
      unit: { type: String, default: "" }
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);