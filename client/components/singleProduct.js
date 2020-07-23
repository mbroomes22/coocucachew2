import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAProduct} from '../store/products'
import {addToCart} from '../store/cart'
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
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // this.props.match.params.productId ? (
    this.props.getProduct(this.props.match.params.productId)

    // : ('loading')
  }

  // handleSubmit(event) {
  //   event.preventDefault()

  //   const productInfo = {
  //     name: this.props.singleProduct.name,
  //     imageUrl: this.props.singleProduct.imageUrl,
  //     price: this.props.singleProduct.price,
  //     description: this.props.singleProduct.description,
  //   }
  //   this.props.addProduct(productInfo)
  // }
  async handleClick(product) {
    const orderproduct = this.props.singleProduct
    const userId = this.props.user.id
    console.log("this.state.userid=>", this.state)
    console.log("this.props.userid=>", userId)
    await this.props.addToCart(userId, orderproduct)
    let updatedProduct = {
      [this.state.name]: this.props.singleProduct,
      quantity: this.state.qty
    }
    ls.set(`${this.state.name}`, updatedProduct)
    alert('Added to cart')
  }

  // Increament = () => {
  //   this.setState({
  //     name: this.props.singleProduct.name,
  //     price: this.props.singleProduct.price,
  //     qty: this.state.qty + 1,
  //   })
  //   ls.set(`${name}`, this.props.singleProduct)
  //   ls.set('price', this.props.singleProduct.price)
  //   ls.set('quantity', this.state.qty + 1)
  // }

  // Decreament = () => {
  //   this.setState({
  //     name: this.props.singleProduct.name,
  //     price: this.props.singleProduct.price,
  //     qty: this.state.qty - 1,
  //   })
  //   ls.set('name', this.props.singleProduct.name)
  //   ls.set('price', this.props.singleProduct.price)
  //   ls.set('quantity', this.state.qty - 1)
  // }

  render() {
    const singleProduct = this.props.singleProduct
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
          {/* <form onSubmit={(event) => this.handleSubmit(event)}>
            <button onClick={this.Decreament}>-</button>
            <div id="selectedQty">{this.state.qty}</div>
            <button onClick={this.Increament}>+</button>
          </form> */}
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
        </div>
        </div>
        {/* end of product details */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("this.state.userid=>", state)
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
