const router = require('express').Router()
const isAdmin = require('../../utils/isAuth')
const {Product, User, OrderProduct, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {id: req.params.productId}
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    await Product.create(req.body)
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.productId
      }
    })
    res.status(201).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    const products = await Product.findAll()
    res.status(201).json(products)
  } catch (err) {
    next(err)
  }
})

module.exports = router
