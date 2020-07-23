// 'use strict'
//to create new dummy data, just run:
//fake-data-generator script/modelsFakeData/MODEL_NAME.json 20(qty of data) script/seedData/SEED_DATA_FILE_NAME.json

'use strict'

const db = require('../server/db')
const {
  User,
  Order,
  Product,
  OrderProduct,
  ProductCategory
} = require('../server/db/models')

const fakeProducts = require('./seedData/products.json')
const fakeUsers = require('./seedData/users.json')
const fakeOrders = require('./seedData/orders.json')
const fakeOrderProducts = require('./seedData/orderProducts')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const cookies = await ProductCategory.create({
    name: 'cookies'
  })

  const chocolates = await ProductCategory.create({
    name: 'chocolates'
  })

  const cakePops = await ProductCategory.create({
    name: 'cakePops'
  })

  const cupcakes = await ProductCategory.create({
    name: 'cupcakes'
  })

  const products = await Promise.all(
    fakeProducts.map(product => Product.create(product))
  )

  const users = await Promise.all(fakeUsers.map(user => User.create(user)))

  const admin = await User.create({
    name: 'Admin',
    email: 'michelle@gmail.com',
    password: '12345',
    isAdmin: true,
    googleId: ''
  })

  const orders = await Promise.all(fakeOrders.map(order => Order.create(order)))

  const orderProducts = await Promise.all(
    fakeOrderProducts.map(orderProduct => OrderProduct.create(orderProduct))
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
