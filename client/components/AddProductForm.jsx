import React from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../store/products'

const defaultState = {
  name: '',
  imageUrl:
    'https://cdn.shopify.com/s/files/1/0034/7550/5225/products/Birthday_Cake_6in_Overhead-1_800x.jpg?v=1579840506',
  price: 0,
  description: ''
}

export class AddProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      price: 0,
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const productInfo = {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      price: this.state.price,
      description: this.state.description
    }

    this.props.addProduct(productInfo)
    this.setState(defaultState)
  }

  render() {
    return (
      <div>
        <h3 className="header">Add A New Product</h3>
        <form onSubmit={e => this.handleSubmit(e)} className="form">
          <label htmlFor="name"> Name: </label>
          <input
            onChange={e => this.handleChange(e)}
            name="name"
            type="text"
            value={this.state.name}
            className="product-field"
          />

          <label htmlFor="imageUrl"> Image URL: </label>
          <input
            onChange={e => this.handleChange(e)}
            name="imageUrl"
            type="text"
            value={this.state.imageUrl}
            className="product-field"
          />

          <label htmlFor="price"> Price: </label>
          <input
            onChange={e => this.handleChange(e)}
            name="price"
            type="number"
            value={this.state.price}
            className="product-field"
          />

          <label htmlFor="description"> Description: </label>
          <input
            onChange={e => this.handleChange(e)}
            name="description"
            type="text"
            value={this.state.description}
            className="product-field"
          />

          <button type="submit" className="buttonC">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  addProduct: productInfo => dispatch(addNewProduct(productInfo))
})

export default connect(mapState, mapDispatch)(AddProductForm)
