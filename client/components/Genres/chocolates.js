import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProductForm from '../AddProductForm'
import {addToCart} from '../../store/cart'
import ls from 'local-storage'
import { fetchProducts } from '../../store/products'

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
    const chocolates = products[0] && products.filter(prod => prod.productCategoryId === 2)

    return (
      <div>
        <div className="main-img chocolate-img">
          <h2>Chocolates</h2>
        </div>
        <div className="card-container">
          {chocolates
            ? chocolates.map(product => {
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
            : 'Sorry, there are currently no chocolates available. Be sure to check back soon!'}
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
    getAllChocolates: () => dispatch(fetchProducts()),
    addToCart: (userId, orderProduct) =>
      dispatch(addToCart(userId, orderProduct))
  }
}

export default connect(mapState, mapDispatch)(Chocolates)
