// backend/models.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false
});

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false }
});

const CartItem = sequelize.define('CartItem', {
  productId: { type: DataTypes.INTEGER, allowNull: false },
  qty: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
});

// Relations (optional)
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

async function syncModels() {
  await sequelize.sync();
}

module.exports = { sequelize, Product, CartItem, syncModels };
