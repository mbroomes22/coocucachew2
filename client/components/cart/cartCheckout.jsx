import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateOrderinDb} from '../../store/cartStore'
import ls from 'local-storage'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS()

export class CartCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  //update the cart
  handleUpdate(e) {
    e.preventDefault()
    // const cartForDb = ls.get('localStorage')
    const {cart, id, updateDbCart} = this.props
    updateDbCart(cart, id)
  }

  //begin checkout cart
  handleCheckout(e) {
    e.preventDefault()
    ls.set('isPending', false)
    const {cart, id, updateDbCart} = this.props
    cart.isPending = false
    updateDbCart(cart, id)
  }

  render() {
    console.log("ls.products cart chkout=>", ls.products)
    return (
      <div>
        {(this.props.cart[0].products && ls.get('subtotal') !== 0) ? (
          <div id="cart_total">
            <div>
              <h4>Subtotal: {'$' + ls.get('subtotal')}</h4>
              <h5>+ shipping: $6 </h5>
            </div>
            <div>
              <h4>Total: {'$' + ls.get('total')}</h4>
              <form onSubmit={e => this.handleUpdate(e)}>
                <Link to="/cart/checkout">
                  <button type="submit" onSubmit={e => this.handleCheckout(e)}>
                    C H E C K O U T
                  </button>
                </Link>
              </form>
            </div>
          </div>
        ) : (this.props.cart[0].products) ? 'Your cart is empty.'  : (
          'Loading your total...'
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateDbCart: (order, orderId) => dispatch(updateOrderinDb(order, orderId))
})

export default connect(null, mapDispatch)(CartCheckout)
