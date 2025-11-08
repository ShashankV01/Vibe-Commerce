// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { syncModels } = require('./models');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

app.get('/', (req, res) => res.send('Vibe Commerce API Running'));

const PORT = process.env.PORT || 5000;

(async () => {
  await syncModels();
  app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
})();
