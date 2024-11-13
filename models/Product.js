const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Product', productSchema);
