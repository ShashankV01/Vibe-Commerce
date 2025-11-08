// backend/routes/cart.js
const express = require('express');
const router = express.Router();
const { CartItem, Product } = require('../models');
const { Op } = require('sequelize');

// POST /api/cart  { productId, qty }
router.post('/', async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId || qty <= 0) return res.status(400).json({ error: 'Invalid payload' });

    // If same product exists, increment qty
    let item = await CartItem.findOne({ where: { productId } });
    if (item) {
      item.qty += Number(qty);
      await item.save();
    } else {
      item = await CartItem.create({ productId, qty });
    }
    // include product details
    await item.reload({ include: [{ model: Product, as: 'product' }] });
    res.status(201).json(item);
  } catch (err) {
    console.error('POST /api/cart error', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = await CartItem.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/cart/:id error', err);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

// PUT /api/cart/:id  { qty } -> update qty
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { qty } = req.body;
    const item = await CartItem.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    if (qty <= 0) {
      await item.destroy();
      return res.json({ success: true, removed: true });
    }
    item.qty = qty;
    await item.save();
    await item.reload({ include: [{ model: Product, as: 'product' }] });
    res.json(item);
  } catch (err) {
    console.error('PUT /api/cart/:id error', err);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.findAll({ include: [{ model: Product, as: 'product' }] });
    const cartItems = items.map(i => ({
      id: i.id,
      productId: i.productId,
      qty: i.qty,
      product: i.product ? { id: i.product.id, name: i.product.name, price: i.product.price } : null,
      lineTotal: i.product ? Number((i.qty * i.product.price).toFixed(2)) : 0
    }));
    const total = Number(cartItems.reduce((s, it) => s + it.lineTotal, 0).toFixed(2));
    res.json({ items: cartItems, total });
  } catch (err) {
    console.error('GET /api/cart error', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

module.exports = router;
