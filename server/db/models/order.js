const router = require('express').Router()
const Sequelize = require('sequelize')
const db = require('../db')
// const {Product, User, OrderProduct} = require('../db/models')

const Order = db.define('order', {
  subTotal: {
    // when and how will we calculate this?
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.INTEGER
  },
  isPending: {
    // isPending = true means that the order is incomplete
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

///make a hook to sum up the cart
// const getSubTotal = async function(order) {
//   try {
//     const orderedProducts = await OrderProduct.get('/', order.id)
//     console.log(orderedProducts)
//     let pOSubTotal = 0
//     orderedProducts.forEach(oP => {
//       oPSubTotal += oP.price
//     })
//     order.subtotal = pOSubTotal
//   } catch (err) {
//     console.error(err)
//   }
// }

// Order.beforeCreate(getSubTotal())
// Order.beforeUpdate(getSubTotal())

module.exports = Order
