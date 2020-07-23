/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const ProductCategory = db.model('productCategory')

// const {db, ProductCategory} = require('../../db')

xdescribe('ProductCategory model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('has field name', async () => {
    const newCategory = await ProductCategory.create({
      name: 'Short Bread'
    })
    expect(newCategory.name).to.equal('Short Bread')
  })

  it('name cannot be empty', async () => {
    const newCategory = ProductCategory.build({
      name: ''
    })
    try {
      await newCategory.validate()
      throw Error('validation should have failed with empty name')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on name')
    }
  })
}) // end describe('ProductCategory model')
