import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProductForm from '../AddProductForm'
import {addToCart} from '../../store/cart'
import ls from 'local-storage'
import { fetchProducts } from '../../store/products'

export class Cookies extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllCookies()
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
    const cookies = products[0] && products.filter(prod => prod.productCategoryId === 1)

    return (
      <div>
        <div className="main-img cookie-img">
          <h2>Cookies</h2>
        </div>
        <div className="card-container">
          {cookies
            ? cookies.map(product => {
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
            : 'Sorry, there are currently no cookies available. Be sure to check back soon!'}
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
    getAllCookies: () => dispatch(fetchProducts()),
  }
}

export default connect(mapState, mapDispatch)(Cookies)
