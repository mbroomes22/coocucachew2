import React from 'react'
import {connect} from 'react-redux'
import {editProduct} from '../store/products'

export class EditProductForm extends React.Component {
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

    const prodID = this.props.id

    const productInfo = {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      price: this.state.price,
      description: this.state.description
    }

    this.props.editProduct(prodID, productInfo)
    this.setState(productInfo)
  }

  render() {
    return (
      <div className="newProd">
        <h3 className="header">Edit Product</h3>
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
            Update
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    prodId: state.products.id
  }
}

const mapDispatch = dispatch => ({
  editProduct: (prodId, productInfo) =>
    dispatch(editProduct(prodId, productInfo))
})

export default connect(mapState, mapDispatch)(EditProductForm)
