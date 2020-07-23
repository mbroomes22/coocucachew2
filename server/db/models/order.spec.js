const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

xdescribe('Sequelize Order Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields total and isPending', async () => {
    const order = await Order.create({
      total: 2,
      isPending: true
    })
    expect(order.total).to.equal(2)
    expect(order.isPending).to.equal(true)
  })
})
