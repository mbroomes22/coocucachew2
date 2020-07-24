import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, removeAProduct} from '../store/products'
import AddProductForm from './AddProductForm'
import {addToCart} from '../store/cart'
import ls from 'local-storage'

export class AllProducts extends React.Component {
  constructor(){
    super()
    this.state= {
      value: 20
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
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

  handleRemove(productId) {
    this.props.removeProduct(productId)
  }

  handleChange = (evt) => {
    this.setState({value: evt.target.value})
  }

  render() {
    const {products} = this.props
    const isAdmin = this.props.user.isAdmin
    // console.log('value', this.state.value)
    const affordable = products[0] && products.map(item => item.price.replace('$', '')).filter(price => price => this.state.value)
    // console.log('affordable', affordable)

    return (
      <div>
        <div className="main-img">
          <h2>Products</h2>
        </div>

        <div className="slidecontainer">
          <input type="range" min="1" max="20" value="20" className="slider" id="myRange" onChange={this.handleChange} />
          <p>Price Range: Less than ${this.state.value}</p>
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
                    {isAdmin ? (
                      <button
                        className="prodBtn admin"
                        type="button"
                        onClick={() => this.handleRemove(product.id)}
                        width="100px"
                      >
                        <h4>remove</h4>
                      </button>
                    ) : null}
                  </div>
                )
              })
            : 'loading....'}
        </div>
        {isAdmin ? (
          <div>
            <AddProductForm props={this.props} />
          </div>
        ) : null}
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
    getAllProducts: () => dispatch(fetchProducts()),
    removeProduct: productId => dispatch(removeAProduct(productId)),
    addToCart: (userId, orderProduct) =>
      dispatch(addToCart(userId, orderProduct))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
