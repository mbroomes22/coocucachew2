import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchChocolates} from '../../store/sweets'
import AddProductForm from '../AddProductForm'
import {addToCart} from '../../store/cart'
import ls from 'local-storage'

export class Chocolates extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllChocolates()
  }

  async handleClick(e, product) {
    const orderproduct = product
    const userId = this.props.user.id
    await this.props.addToCart(userId, orderproduct)
    let updatedProduct = {
      [product.name]: product,
      quantity: 1
    }
    ls.set(`${product.name}`, updatedProduct)
    alert('Added to cart')
  }

  render() {
    const {products} = this.props

    return (
      <div>
        <div className="main-img">
          <h2>Products</h2>
        </div>
        <div className="card-container">
          {this.props.products[0]
            ? products.map(product => {
                return (
                  <div key={product.id} className="card">
                    <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} className="all-prod-img" />

                      <h4 className="all-product-container">{product.name}</h4>

                    <h4 className="product-price">{product.price}</h4>
                    </Link>
                    <button type="submit" className="prodBtn" onClick={e => this.handleClick(e, product)}>Add to Cart</button>
                  </div>
                )
              })
            : 'loading....'}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getAllChocolates: () => dispatch(fetchChocolates())
  }
}

export default connect(mapState, mapDispatch)(Chocolates)
