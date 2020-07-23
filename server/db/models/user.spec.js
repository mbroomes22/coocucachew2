/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

xdescribe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  xdescribe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          isAmin: false
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  })

  // end describe('instanceMethods')

  describe('User', () => {
    describe('user email', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          isAmin: false
        })
      })

      it('retuns the correct email', () => {
        expect(cody.email).to.be.equal('cody@puppybook.com')
      })
      it('requires an email', async () => {
        const giselle = User.build()

        try {
          await giselle.validate()
          throw Error(
            'validation was successful but should have failed without `email`'
          )
        } catch (err) {
          expect(err.message).to.contain('email cannot be null')
        }
      })
    })
  })
}) // end describe('User model')
