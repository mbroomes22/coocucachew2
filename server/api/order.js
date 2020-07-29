const router = require('express').Router()
// const isAuth = require('../../utils/isAuth)
const {Product, User, OrderProduct, Order} = require('../db/models')

//is auth or isAdmin
// authorizations folder with isAdmin and isAuth plus any others
//authhelpers.js
router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport) {
      const fetchedOrder = await Order.findOrCreate({
        where: {
          userId: req.session.passport.user,
          isPending: true
        },
        include: Product
      })
      res.json(fetchedOrder)
    } else {
      const fetchedOrder = await Order.findOrCreate({
        where: {
          isPending: true,
          userId: null
        },
        include: Product
      })
      res.json(fetchedOrder)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.sessions.passport.user,
        isPending: false
      },
      include: Product
    })
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    //check object and update
    const orderToUpdate = await Order.findOne(req.params.id, {
      where: {
        // userId: req.session.passport.user,
        isPending: true,
        orderId: req.params.orderId
      },
      include: Product
    })
    const updatedOrder = await Order.update(req.body)
    res.send(updatedOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    if (req.session.passport.user) {
      const fetchedOrder = await Order.destroy({
        where: {
          userId: req.session.passport.user,
          orderId: req.params.id,
          isPending: true
        }
      })
      res.json(fetchedOrder)
    } else {
      const fetchedOrder = await Order.destroy({
        where: {
          orderId: req.params.id,
          isPending: true
        }
      })
      res.status(201).json(fetchedOrder)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let order
    if (!req.body.userId) {
      order = await Order.findOrCreate({
        where: {
          userId: null,
          isPending: 'True'
        },
        include: [Product]
      })
    } else {
      order = await Order.findOrCreate({
        where: {
          userId: req.body.userId,
          isPending: 'True'
        },
        include: Product
      })
    }
    const orderId = order[0].dataValues.id
    const currentOrder = await Order.findByPk(orderId)
    const newOrderProduct = await OrderProduct.findOrCreate({
      where: {
        productId: req.body.orderProduct.id,
        orderId: currentOrder.dataValues.id
      }
    })
    const productOrder = await OrderProduct.findOne({
      where: {
        orderId: orderId,
        productId: req.body.orderProduct.id
      }
    })
    const qty = productOrder.dataValues.quantity
    if (qty === null) {
      await productOrder.update({
        quantity: 1
      })
    } else {
      await productOrder.update({
        quantity: qty + 1
      })
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
