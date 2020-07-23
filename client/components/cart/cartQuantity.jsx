import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ls from 'local-storage'
import {
  updateCartDbProduct,
  deleteProductFromDbCart,
  deleteOrderFromDb
} from '../../store/cartStore'
import {quantityAlert} from '../../utils'

export class CartQuantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.product.orderProduct.quantity
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.product.orderProduct.quantity
    })
  }

  handleUpdate(e) {
    // e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
    const updatedProduct = {
      ...this.props.product,
      orderProduct: {
        ...this.props.product.orderProduct,
        quantity: this.state.quantity
        //maybe can add a this.setState to change the qty when click delete btn
      }
    }
    ls.set(`${this.props.product.name}`, updatedProduct)
    const newPrice =
      ls.get('subtotal') +
      this.state.quantity * parseInt(this.props.product.price.substring(1), 10)
    ls.set('subtotal', newPrice)
    ls.set('total', newPrice + 6)

    this.props.updateCartProduct(
      this.props.cart.id,
      updatedProduct.orderProduct
    )
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
    const {product, cart, deleteProduct} = this.props
    quantityAlert(
      this.state.quantity,
      product.id,
      cart.id,
      product.name,
      deleteProduct
    )
  }

  increment(e) {
    e.preventDefault()
    const quantity = this.state.quantity
    quantity < 20 &&
      this.setState({
        quantity: quantity + 1
      })
    const {product, cart, deleteProduct} = this.props
    //
    // DOUBLE CHECK THAT THIS HELPER FUNCTION CAN BE USED HERE WITH DELETE
    //
    quantityAlert(quantity, product.id, cart.id, product.name, deleteProduct)
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  }

  decrement(e) {
    e.preventDefault()
    const quantity = this.state.quantity
    quantity >= 1 &&
      this.setState({
        quantity: quantity - 1
      })
    const {product, cart, deleteProduct, deleteOrder} = this.props
    quantityAlert(quantity, product.id, cart.id, product.name, deleteProduct)
    if (cart.products.length < 1) {
      deleteOrder(cart.id)
    }
  }

  clearAll(e) {
    e.preventDefault()
    this.setState({
      quantity: 0
    })

    const {product, cart, deleteProduct} = this.props
    deleteProduct(product.id, cart.id)
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleUpdate(e)}>
          <button type="button" onClick={e => this.decrement(e)}>
            {' '}
            -{' '}
          </button>
          <input
            onChange={e => this.handleChange(e)}
            type="number"
            value={this.state.quantity}
            name="quantity"
          />
          <button type="button" onClick={e => this.increment(e)}>
            {' '}
            +{' '}
          </button>
          <button type="submit">Update</button>
          <button type="button" onClick={e => this.clearAll(e)}>
            Delete
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateCartProduct: (orderId, orderProduct) =>
    dispatch(updateCartDbProduct(orderId, orderProduct)),
  deleteProduct: (productId, orderId) =>
    dispatch(deleteProductFromDbCart(productId, orderId)),
  deleteOrder: orderId => dispatch(deleteOrderFromDb(orderId))
})

export default connect(null, mapDispatch)(CartQuantity)
