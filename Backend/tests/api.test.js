// backend/tests/api.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('../routes/products');
const cartRouter = require('../routes/cart');
const checkoutRouter = require('../routes/checkout');
const { syncModels, Product, CartItem } = require('../models');

const app = express();
app.use(bodyParser.json());
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

beforeAll(async () => {
  await syncModels();
  await Product.destroy({ where: {} });
  await CartItem.destroy({ where: {} });
  await Product.bulkCreate([
    { name: 'Test A', price: 10 },
    { name: 'Test B', price: 20 }
  ]);
});

afterAll(async () => {
  // close DB connection
  const { sequelize } = require('../models');
  await sequelize.close();
});

test('GET /api/products returns items', async () => {
  const res = await request(app).get('/api/products');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThanOrEqual(2);
});

test('POST /api/cart add item and GET /api/cart shows total', async () => {
  const products = await Product.findAll();
  const p0 = products[0];
  const addRes = await request(app).post('/api/cart').send({ productId: p0.id, qty: 2 });
  expect(addRes.status).toBe(201);

  const cartRes = await request(app).get('/api/cart');
  expect(cartRes.status).toBe(200);
  expect(typeof cartRes.body.total).toBe('number');
});

test('POST /api/checkout returns receipt', async () => {
  const cartRes = await request(app).get('/api/cart');
  const body = {
    cartItems: cartRes.body.items.map(it => ({ productId: it.productId, qty: it.qty })),
    name: 'Tester',
    email: 't@test.com'
  };
  const res = await request(app).post('/api/checkout').send(body);
  expect(res.status).toBe(200);
  expect(res.body.receipt).toBeDefined();
  expect(res.body.receipt.total).toBeGreaterThanOrEqual(0);
});
