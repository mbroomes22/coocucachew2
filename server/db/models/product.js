const Sequelize = require('sequelize')
const db = require('../db')
const ProductCategory = require('./product_category')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true
    },
    get() {
      return '$' + this.getDataValue('price')
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'candy-set-sweet-desserts-chocolate-candies-vector-26628401.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Product
