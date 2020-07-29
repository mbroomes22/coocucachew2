import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAProduct} from '../store/products'
import {addToCart} from '../store/cart'
import EditProductForm from './EditProductForm'
import ls from 'local-storage'
//need import

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      qty: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // this.props.match.params.productId ? (
    this.props.getProduct(this.props.match.params.productId)

    // : ('loading')
  }

  async handleClick(product) {
    const orderproduct = this.props.singleProduct
    const userId = this.props.user.id
    await this.props.addToCart(userId, orderproduct)
    let updatedProduct = {
      [this.state.name]: this.props.singleProduct,
      quantity: this.state.qty
    }
    ls.set(`${this.state.name}`, updatedProduct)
    alert('Added to cart')
  }

  render() {
    const singleProduct = this.props.singleProduct
    const isAdmin = this.props.user.isAdmin
    return (
      <div className="singleProduct_page">
        <div className="header" key={singleProduct.id}>
          <h3>{singleProduct.name}</h3>
        </div>
        {/* start of product details */}
        <div className="singleProduct_container">
          <div className="left-box">
            <div className="singleProduct_image">
              <img src={singleProduct.imageUrl} />
            </div>
          </div>
          <div className="right-box">
            <div className="product-description">
              <p>{singleProduct.description}</p>
            </div>

            <div className="singleProduct_price">
              <p className="product-price">{singleProduct.price}</p>
            </div>

            <div className="quantity_change">
              <button
                className="buttonC"
                type="submit"
                onClick={e => {
                  this.handleClick(e)
                }}
              >
                add to cart
              </button>
            </div>

            <div className="tags">
              <p>Tags:&nbsp;</p>{' '}
              {singleProduct.tags
                ? singleProduct.tags.map(item => {
                    return (
                      <div key={item}>
                        <p>#{item}&nbsp;</p>
                      </div>
                    )
                  })
                : null}
            </div>

            {isAdmin ? (
              <div>
                <EditProductForm props={this.props} />
              </div>
            ) : null}
          </div>
        </div>
        {/* end of product details */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getAProduct(productId)),
    addToCart: (userId, orderProduct) =>
      dispatch(addToCart(userId, orderProduct))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
