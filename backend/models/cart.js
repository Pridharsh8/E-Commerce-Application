const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  products: [
    {
      prodName: String,
      amt: Number,
      size: String,
    }
  ],
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;
