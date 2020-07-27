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
      value: 20,
      filterBy: ''
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

  filtration = (evt) => {
    if (!this.state.filterBy) {
      this.setState({
        filterBy: evt.target.value
      })
    } else {
      this.setState({
        filterBy: ""
      })
    }
  }

  observe = (evt) => {
    evt.preventDefault()

    evt.target.className === 'buttonC' ? (evt.target.className += ' active-tag-btn') : (evt.target.className = 'buttonC')

  }

  render() {
    const {products} = this.props
    const isAdmin = this.props.user.isAdmin

    const affordItems = products[0] && products.filter((prod) => {return parseInt(prod.price.slice(1), 10) <= this.state.value} )
    const filteredItems = affordItems && affordItems.filter(item => item.tags.includes(this.state.filterBy))

    return (
      <div>
        <div className="main-img">
          <h2>Products</h2>
        </div>

        <div className="filteredRes">
        <div className="slidecontainer">
          <h3>Set your budget!</h3>
          <input type="range" min="1" max="20" value={this.state.value} className="slider" id="myRange" onChange={this.handleChange} />
          <p>Price Range: Less than ${this.state.value}</p>
        </div>

        <div className="slidecontainer">
          <h3>Search by tag:</h3>
          <button type="button" className="buttonC" value="chocolate" onClick={(evt) => {this.filtration(evt); this.observe(evt)}}>chocolate</button>{' '}
          <button type="button" className="buttonC" value="frosting" onClick={(evt) => {this.filtration(evt); this.observe(evt)}}>frosting</button>{' '}
          <button type="button" className="buttonC" value="nuts" onClick={(evt) => {this.filtration(evt); this.observe(evt)}}>nuts</button>{' '}
          <button type="button" className="buttonC" value="fruits" onClick={(evt) => {this.filtration(evt); this.observe(evt)}}>fruits</button>{' '}
          <button type="button" className="buttonC" value="salted" onClick={(evt) => {this.filtration(evt); this.observe(evt)}}>salted</button>{' '}
        </div>

        <div>
          <p>{(products[0] && filteredItems[0]) ? filteredItems.length : (products[0] && !filteredItems[0]) ? affordItems.length : 0} results found</p>
        </div>
        </div>

        <div className="card-container">
          {(products[0] && filteredItems[0])
            ? filteredItems.map(product => {
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
            : (products[0] && !filteredItems[0])
            ? affordItems.map(product => {
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
              }):'Loading...'}
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
