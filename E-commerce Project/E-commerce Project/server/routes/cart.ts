import express from 'express';
import Cart from '../models/Cart';
import { authenticateToken } from './middleware';

const router = express.Router();

// GET user cart
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load cart.' });
  }
});

// POST/PUT cart
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const items = req.body.items;
    const existing = await Cart.findOne({ userId });

    if (existing) {
      existing.items = items;
      await existing.save();
    } else {
      await Cart.create({ userId, items });
    }

    res.json({ message: 'Cart saved' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save cart.' });
  }
});

export default router;

