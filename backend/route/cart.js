const express = require('express');
const Cart = require('../models/cart'); // Assuming Cart schema is stored in models
const router = express.Router();

// Add to cart route
router.post('/api/cart/add', async (req, res) => {
  const { userId, product } = req.body;

  try {
    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new cart for the user
      cart = new Cart({ userId, products: [product] });
    } else {
      // If the cart exists, add the product to the cart
      cart.products.push(product);
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});

module.exports = router;
