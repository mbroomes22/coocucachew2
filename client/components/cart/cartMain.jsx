import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../../store/cartStore'
import {CartList} from './cartList'

export class CartMain extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
  }

  render() {
    return this.props.cart ? (
      <div id="cart">
        <h3>C A R T</h3>
        <CartList cart={this.props.cart} />
      </div>
    ) : (
      'Loading Cart...'
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(CartMain)
