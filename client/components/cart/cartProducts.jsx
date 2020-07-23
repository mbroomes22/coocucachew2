import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartQuantity from './cartQuantity'
import CartCheckout from './cartCheckout'
import ls from 'local-storage'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS()

export class CartProducts extends React.Component {
  render() {
    const lsProducts = ls.get('cartProducts')
    return (
      <div>
        {this.props.cart[0].products
          ? lsProducts.map(product => (
              <div key={product.id} className="cartproducts">
                <Link to={`/${product.id}`}>
                  <img src={product.imageUrl} width="50" />
                  <h4>{product.name}</h4>
                </Link>
                <CartQuantity product={product} cart={this.props.cart[0]} />
                <div>
                  <p>{product.price}</p>
                </div>
              </div>
            ))
          : 'Loading... Please wait while I fetch your cart'}
        {
          <CartCheckout
            cart={this.props.cart}
            nextStep={this.props.nextStep}
            prevStep={this.props.prevStep}
          />
        }
      </div>
    )
  }
}

export default connect(null, null)(CartProducts)
