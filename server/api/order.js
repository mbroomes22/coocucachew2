const router = require('express').Router()
// const isAuth = require('../../utils/isAuth)
const {Product, User, OrderProduct, Order} = require('../db/models')

//is auth or isAdmin
// authorizations folder with isAdmin and isAuth plus any others
//authhelpers.js
router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport.user) {
      const fetchedOrder = await Order.findOrCreate({
        where: {
          userId: req.session.passport.user,
          isPending: true
        },
        include: Product
      })
      console.log('--->  FETCHED OR CREATED AN ORDER W A USER  <---')
      res.json(fetchedOrder)
    } else {
      const fetchedOrder = await Order.create({
        isPending: true,
        userId: null
      })
      console.log('--->  CREATED AN ORDER W/O A USER  <---')
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
  console.log('REQ.BODY IN ORDER PUT ROUTE', req.body)
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

    console.log('SEE ME!!', updatedOrder)
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
      console.log('--->  DELETED AN ORDER W A USER  <---')
      res.json(fetchedOrder)
    } else {
      const fetchedOrder = await Order.destroy({
        where: {
          orderId: req.params.id,
          isPending: true
        }
      })
      console.log('--->  DELETED AN ORDER W/O A USER  <---')
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
      // console.log('^^See Me! I am Req.body:^^', req.body)
      order = await Order.findOrCreate({
        where: {
          userId: null,
          isPending: 'True'
        },
        include: [Product]
      })
    } else {
      // console.log('^^See Me! I am Req.body2:^^', req.body)
      order = await Order.findOrCreate({
        where: {
          userId: req.body.userId,
          isPending: 'True'
        },
        include: Product
      })
    }
    // console.log('I AM ORDER', order)
    const orderId = order[0].dataValues.id
    const currentOrder = await Order.findByPk(orderId)
    // console.log('$I am CURRENTORDER:$', req.body)
    // console.log('ORDER ID ~~', orderId)
    // console.log('CURRENT ORDER', currentOrder)
    const newOrderProduct = await OrderProduct.findOrCreate({
      where: {
        productId: req.body.orderProduct.id,
        orderId: currentOrder.dataValues.id
      }
    })
    // console.log('NEW ORDER PRODUCT', newOrderProduct)
    const productOrder = await OrderProduct.findOne({
      where: {
        orderId: orderId,
        productId: req.body.orderProduct.id
      }
    })
    // console.log('!!!!PRODUCT_ORDER!!!!', productOrder)
    const qty = productOrder.dataValues.quantity
    // console.log('Q-T-Y', qty)
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
