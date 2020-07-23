import sinon from 'sinon'
const {expect} = require('chai')
const app = require('../../server')
const agent = require('supertest')(app)

const {Product} = require('../db/models')

describe('Products Routes', () => {
  const products = [
    {
      id: 1,
      name: 'snickerDoodle',
      imageUrl:
        'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
      price: 0.0
    },
    {
      id: 2,
      name: 'thinMint',
      imageUrl:
        'https://www.clipartkey.com/mpngs/m/62-623214_thin-mint-clipart-thin-mint-cookies-transparent.png',
      price: 0.0
    }
  ]

  const {findAll: productFindAll} = Product
  beforeEach(() => {
    Product.findAll = sinon.spy(() => products)
  })
  afterEach(() => {
    Product.findAll = productFindAll
  })

  it('GET /api/products responds with all products', async () => {
    const response = await agent.get('/api/products').expect(200)
    expect(response.body).to.deep.equal([
      {
        id: 1,
        name: 'snickerDoodle',
        imageUrl:
          'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
        price: 0.0
      },
      {
        id: 2,
        name: 'thinMint',
        imageUrl:
          'https://www.clipartkey.com/mpngs/m/62-623214_thin-mint-clipart-thin-mint-cookies-transparent.png',
        price: 0.0
      }
    ])
  })
})
