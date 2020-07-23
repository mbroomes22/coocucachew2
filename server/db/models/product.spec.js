const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

xdescribe('Sequelize Product Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields name, price, imageUrl, description, isActive, stock', async () => {
    const ChocolateChip = await Product.create({
      name: 'Classic Chocolate Chip',
      price: 2,
      imageUrl:
        'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1.jpg',
      description: 'The best Chocolate Chip cookie in the world!',
      isActive: true,
      stock: 5
    })
    expect(ChocolateChip.name).to.equal('Classic Chocolate Chip')
    expect(ChocolateChip.price).to.equal('$2')
    expect(ChocolateChip.imageUrl).to.equal(
      'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1.jpg'
    )
    expect(ChocolateChip.description).to.equal(
      'The best Chocolate Chip cookie in the world!'
    )
    expect(ChocolateChip.isActive).to.equal(true)
    expect(ChocolateChip.stock).to.equal(5)
  })

  it('requires name, price, and description', async () => {
    const ChocolateChip = Product.build()
    try {
      await ChocolateChip.validate()
      throw Error(
        'validation should have failed without name, price, and description'
      )
    } catch (err) {
      expect(err.message).to.contain('name cannot be null')
      expect(err.message).to.contain('price cannot be null')
      expect(err.message).to.contain('description cannot be null')
    }
  })

  it('name, price, and description cannot be empty', async () => {
    const ChocolateChip = Product.build({name: '', price: '', description: ''})
    try {
      await ChocolateChip.validate()
      throw Error(
        'validation should have failed with empty name, price, and description'
      )
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on name')
      expect(err.message).to.contain('Validation notEmpty on price')
      expect(err.message).to.contain('Validation notEmpty on description')
    }
  })

  it('default imageUrl if left blank', async () => {
    const ChocolateChip = Product.build({
      name: 'Classic Chocolate Chip',
      price: 2,
      description: 'The best Chocolate Chip cookie in the world!'
    })
    await ChocolateChip.validate()
    expect(ChocolateChip.imageUrl).to.be.a('string')
    expect(ChocolateChip.imageUrl.length).to.be.greaterThan(1)
  })
})
