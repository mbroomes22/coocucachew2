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

module.exports = Order
