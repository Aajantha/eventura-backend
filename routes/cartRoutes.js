import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { serviceName, startingPrice, userId } = req.body;
    const cartItem = new Cart({ serviceName, startingPrice, userId });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all cart items for a user
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear all items from a user's cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.params.userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
