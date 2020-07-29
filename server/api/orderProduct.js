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
    if (req.session.passport) {
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
    } else {
      const productToUpdate = await OrderProduct.findOne({
        where: {
          orderId: req.params.orderId,
          productId: OrderProduct.productId
        },
        include: Product
      })
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
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    if (req.session.passport) {
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
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
