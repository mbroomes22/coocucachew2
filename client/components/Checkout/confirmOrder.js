//needs to be passed props from '../cart and userForm', bc props should access userid, item name, price, qty of items in cart and confirm a calculated total
//clicking 'Confirm&Checkout' button should send user's address, cart, and payment to db
import React, {Component} from 'react'
import {updateOrderHistory, updateUserAddresses} from '../../store/saveOrder'
import {connect} from 'react-redux'

export class ConfirmOrder extends Component {
  continue = evt => {
    evt.preventDefault()
    this.props.nextStep()
  }

  goBack = evt => {
    evt.preventDefault()
    this.props.prevStep()
  }

  checkoutSubTotal = cartItemsArr => {
    let subTotal = 0
    cartItemsArr.forEach(item => {
      subTotal += item.price * item.qty
    })
    return subTotal
  }

  checkoutTotal = subTotal => {
    return subTotal + 6
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const subTotal = checkoutSubTotal(this.props.cart) //not sure if the user's cart prop is an arr named cart
    const total = checkoutTotal(subTotal)
    this.props.addOrder(subTotal, total, this.props.cart.userId) //not sure if user's id is named userId and located in cart
    this.props.addAddress(
      this.state.streetAddress,
      this.state.zipCode,
      this.state.state
    )
    this.setState({
      name: '',
      email: '',
      streetAddress: '',
      zipCode: '',
      state: ''
    })
  }

  render() {
    const {values: {name, email, streetAddress, zipCode, state}} = this.props
    const {cart} = this.props
    let total = 0
    cart[0].products.map(
      item => (total += item.price.slice(1) * item.orderProduct.quantity)
    )
    return (
      <div className="center">
        <br />
        <button type="submit" onClick={this.goBack} className="buttonC">
          Return to Payment Details
        </button>
        <h1 className="header">Confirm Order Details</h1>
        <br />
        <div className="shippingInfo">

        <div className="purchasing">
        <h2>Shipping Address</h2>
        <div className="card-container">
          <ul className="card">
            <ol>
              <h3>Name:</h3> {name}
              <br />
            </ol>
            <ol>
              <h3>Email:</h3> {email}
              <br />
            </ol>
            <ol>
              <h3>Street Address:</h3> {streetAddress}
              <br />
            </ol>
            <ol>
              <h3>ZIP code:</h3> {zipCode}
              <br />
            </ol>
            <ol>
              <h3>State:</h3> {state}
              <br />
            </ol>
          </ul>
        </div>
        </div>

        <div className="purchasing">
        <h2>Payment Method</h2>
        <ul>
          <ol>
            <p>Stripe</p>
          </ol>
        </ul>
        <br />
        </div>

        <div className="purchasing">
        <h2>Review Items</h2>

        <ul className="checkout-card-container">
          {cart[0].products &&
            cart[0].products.map(item => (
              <div key={item.id} className="checkout-card">
                <ol>
                  <h3>{item.name}</h3>
                </ol>
                <ol>
                  <h3>
                    <img src={item.imageUrl} width="75px" />
                  </h3>
                </ol>
                <ol>
                  <h3>Qty: {item.orderProduct.quantity}</h3>
                </ol>
                <ol>
                  <h3>{item.price}</h3>
                </ol>
              </div>
            ))}
        </ul>
        </div>

        <div className="purchasing">
        <h3>Subtotal</h3>
        <p>${total}</p>
        <br />
        <h3>Shipping</h3>
        <p>$6</p>
        <br />
        <h2>Total</h2>
        <p>${total + 6}</p>
        <br />
        <br />
        </div>
        </div>
        <button
          type="submit"
          onClick={this.continue}
          onSubmit={this.handleSubmit}
          className="buttonC checkout"
        >
          Confirm & Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  addOrder: (orderSubTotal, orderTotal, orderUserID) =>
    dispatch(updateOrderHistory(orderSubTotal, orderTotal, orderUserID)),
  addAddress: (newAddress, newZip, newState) =>
    dispatch(updateUserAddresses(newAddress, newZip, newState))
})

export default connect(mapState, mapDispatch)(ConfirmOrder)
