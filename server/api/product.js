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
  console.log("req.params", req)
  try {
    const singleProduct = await Product.findOne({
      where: {id: req.params.productId}
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/:productCategoryId', async (req, res, next) => {
  console.log("req.params", req.params)
  try {
    const singleGenre = await Product.findAll({
      where: {productCategoryId: req.params.productId}
    })
    res.json(singleGenre)
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
    const updatedProduct = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    console.log('express req.params=>', req.params)
    console.log('express req.body=>', req.body)
    const updateProduct = await updatedProduct.update(req.body)
    res.json(updateProduct)
  } catch (error) {
    next(error)
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
