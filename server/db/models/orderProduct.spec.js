const {expect} = require('chai')
const db = require('../index')
const OrderProduct = db.model('orderProduct')
const Product = require('./product')
const Order = require('./order')

xdescribe('orderProduct Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  let product
  let order

  beforeEach(async () => {
    product = await Product.create({
      name: 'Candy',
      description: 'really sweet',
      price: 10
    })
    order = await Order.create({
      total: 10
    })
  })

  it('has quantity and price', async () => {
    const orderProduct = await OrderProduct.create({
      quantity: 5,
      price: 10,
      productId: 1,
      orderId: 1
    })
    expect(orderProduct.quantity).to.equal(5)
    expect(orderProduct.price).to.equal(10)
  })
})
