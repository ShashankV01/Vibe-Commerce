// backend/routes/checkout.js
const express = require('express');
const router = express.Router();
const { CartItem, Product } = require('../models');

// POST /api/checkout  { cartItems: [{ productId, qty }], name, email }
router.post('/', async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // calculate total by fetching product prices
    const productIds = cartItems.map(ci => ci.productId);
    const products = await Product.findAll({ where: { id: productIds } });
    const productMap = new Map(products.map(p => [p.id, p]));

    let total = 0;
    const receiptItems = cartItems.map(ci => {
      const p = productMap.get(ci.productId);
      const price = p ? p.price : 0;
      const line = Number((price * ci.qty).toFixed(2));
      total += line;
      return { productId: ci.productId, name: p ? p.name : 'Unknown', qty: ci.qty, price, line };
    });
    total = Number(total.toFixed(2));

    const receipt = {
      id: Date.now().toString(),
      name: name || 'Guest',
      email: email || null,
      items: receiptItems,
      total,
      timestamp: new Date().toISOString()
    };

    // Optionally, clear cart DB after checkout (mock). We'll leave items as-is but we can remove:
    // await CartItem.destroy({ where: {} });

    res.json({ success: true, receipt });
  } catch (err) {
    console.error('POST /api/checkout error', err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

module.exports = router;
