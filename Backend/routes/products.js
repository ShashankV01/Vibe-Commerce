// backend/routes/products.js
const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('GET /api/products error', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
