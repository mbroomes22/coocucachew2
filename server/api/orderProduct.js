const router = require('express').Router()
const isAdmin = require('../../utils/isAuth')
const {Product, User, OrderProduct, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const fetchedOrderProducts = await OrderProduct.findAll({
      where: {
        orderId: req.body.orderId
      }
    })
    res.json(fetchedOrderProducts)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  const {quantity, productId, orderId} = req.body
  try {
    // console.log('INSIDE THE UPDATE PRODUCT WORKS', orderId, productId, quantity)
    if (req.session.passport.user) {
      const productToUpdate = await OrderProduct.findOne({
        where: {
          orderId: req.params.orderId,
          productId: productId
        }
      })
      const loggedUserOrder = await Order.findOne({
        where: {
          userId: req.session.passport.user,
          id: req.params.orderId
        },
        include: Product
      })
      if (productToUpdate.orderId !== loggedUserOrder.id) {
        console.error('You are not authoritzed to update this order')
      } else {
        await productToUpdate.update({
          quantity: quantity,
          productId: productId,
          orderId: orderId
        })
        res.status(200).json(loggedUserOrder)
      }
      // console.log('--->  FOUND AN ORDER W A USER  <---')
    } else {
      const productToUpdate = await OrderProduct.findOne({
        where: {
          orderId: req.params.orderId,
          productId: OrderProduct.productId
        },
        include: Product
      })
      // console.log('--->  FOUND AN ORDER W/O A USER  <---')
      await productToUpdate.update({
        quantity: quantity,
        productId: productId,
        orderId: orderId
      })
      const loggedUserOrder = await Order.findOne({
        where: {
          userId: req.session.passport.user,
          id: req.params.orderId
        },
        include: Product
      })
      res.status(200).json(loggedUserOrder)
    }
    // console.log('-------->  UPDATED AN ORDER  <--------')
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    if (req.session.passport.user) {
      console.log(
        'ORDER ID',
        req.params.orderId,
        'PRODUCT ID',
        req.body.productId
      )
      await OrderProduct.destroy({
        where: {
          // userId: req.session.passport.user,
          orderId: req.params.orderId,
          productId: req.body.productId
          // isPending: true
        }
      })
      const loggedUserOrder = await Order.findOne({
        where: {
          userId: req.session.passport.user,
          id: req.params.orderId
        },
        include: Product
      })
      res.status(200).json(loggedUserOrder)
      console.log('--->  DELETED AN ORDER W A USER  <---')
    } else {
      await OrderProduct.destroy({
        where: {
          orderId: req.params.orderId
          // isPending: true
        }
      })
      const loggedUserOrder = await Order.findOne({
        where: {
          userId: req.session.passport.user,
          id: req.params.orderId
        },
        include: Product
      })
      res.status(200).json(loggedUserOrder)
      console.log('--->  DELETED AN ORDER W/O A USER  <---')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
