const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

// class ProductCategory extends Product {}
// ProductCategory.init(
//   {
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//   },
//   {sequlize, modelName: 'ProductCategory'}
// )

const ProductCategory = db.define('productCategory', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = ProductCategory
