// backend/seed.js
const { Product, syncModels } = require('./models');

const seedProducts = [
  { name: 'Vibe T-Shirt', price: 19.99 },
  { name: 'Vibe Hoodie', price: 44.5 },
  { name: 'Vibe Cap', price: 12.0 },
  { name: 'Vibe Sticker Pack', price: 4.99 },
  { name: 'Vibe Mug', price: 14.25 }
];

async function seed() {
  await syncModels();
  const existing = await Product.count();
  if (existing === 0) {
    for (const p of seedProducts) {
      await Product.create(p);
    }
    console.log('Seeded products.');
  } else {
    console.log('Products exist, skipping seed.');
  }
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
