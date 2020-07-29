import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {getOrderHistory} from '../store/saveOrder'
import {fetchCart} from '../store/cartStore'
import Flickity from 'react-flickity-component'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  //this.props.match.params.productId
  async componentDidMount() {
    await this.props.getCart()
    await this.props.getAllProducts()
  }

  render() {
    const {name, isLoggedIn, orderHistory, products} = this.props
    // console.log('USER HOME orderHistory', orderHistory)
    console.log('props', this.props)
    return (
      <div>
        {isLoggedIn ? (
          <div>
            <h3 className="pad">Welcome {name}</h3>
            <h2 h2 id="main-header">
              Browse our categories:
            </h2>
            <br />
            <div className="card-container">
              <div className="card">
                <Link to="/products/cakepops">
                  <img
                    src="https://cdn.shopify.com/s/files/1/1354/8045/products/cakepops_large.jpg?v=1469295321"
                    height="200px"
                    className="all-prod-img"
                  />
                  <h3>Explore our Cakepops</h3>
                </Link>
              </div>
              <div className="card">
                <Link to="/products/cupcakes">
                  <img
                    src="https://www.tasteofhome.com/wp-content/uploads/2019/12/Oreo-Cupcakes-with-Cookies-and-Cream-Frosting_EXPS_FT19_247265_F_1203_1-696x696.jpg"
                    width="200px"
                    className="all-prod-img"
                  />
                  <h3>See more Cupcakes</h3>
                </Link>
              </div>
              <div className="card">
                <Link to="/products/cookies">
                  <img
                    src="https://www.texanerin.com/content/uploads/2019/09/paleo-chocolate-chip-cookies-8fi2.jpg"
                    height="200px"
                    className="all-prod-img"
                  />
                  <h3>Explore our Cookies</h3>
                </Link>
              </div>
              <div className="card">
                <Link to="/products/chocolates">
                  <img src="choc.png" width="200px" className="all-prod-img" />
                  <h3>See our Chocolates</h3>
                </Link>
              </div>
            </div>

            <div className="orderHistory">
              <h2 id="main-header">Your Order History:</h2>
              {orderHistory[0] && !orderHistory[0].isPending ? (
                <div>
                  <ul className="checkout-card-container">
                    {/* <h3>Your Orders From: </h3> */}
                    {/* {<div>({date})</div>} */}
                    <div className="history-card">
                      <div className="history-info">
                        <h4>ORDER PLACED</h4>
                        <p>
                          {Date(orderHistory[0].orderProduct.createdAt).slice(
                            0,
                            16
                          )}
                        </p>
                        <h4>TOTAL</h4>
                        <p>$</p>
                        <h4>ORDER #</h4>
                        <p>{orderHistory[0].orderProduct.orderId}</p>
                      </div>
                      {orderHistory.map(item => (
                        <div key={item.id}>
                          <div key={item.id} className="checkout-card history">
                            <ol>
                              <h3>{item.name}</h3>
                            </ol>
                            <ol>
                              <h3>
                                <img src={item.imageUrl} width="75px" />
                              </h3>
                            </ol>
                            <ol>
                              <h3>Qty: {item.orderProduct.quantity}</h3>
                            </ol>
                            <ol>
                              <h3>{item.price}</h3>
                            </ol>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
              ) : null}
            </div>

            <div>
              <h2 h2 id="main-header">
                See What's Popular:
              </h2>

              <Flickity>
                {products[0] && (
                  <>
                    <div className="card-container">
                      <div className="card">
                        <Link to={`/products/${products[4].id}`}>
                          <img
                            src={products[4].imageUrl}
                            height="200px"
                            className="all-prod-img"
                          />
                          <h3>{products[4].name}</h3>
                        </Link>
                      </div>
                    </div>

                    <div className="card-container">
                      <div className="card">
                        <Link to={`/products/${products[34].id}`}>
                          <img
                            src={products[34].imageUrl}
                            height="200px"
                            className="all-prod-img"
                          />
                          <h3>{products[34].name}</h3>
                        </Link>
                      </div>
                    </div>

                    <div className="card-container">
                      <div className="card">
                        <Link to={`/products/${products[17].id}`}>
                          <img
                            src={products[17].imageUrl}
                            height="200px"
                            className="all-prod-img"
                          />
                          <h3>{products[17].name}</h3>
                        </Link>
                      </div>
                    </div>

                    <div className="card-container">
                      <div className="card">
                        <Link to={`/products/${products[22].id}`}>
                          <img
                            src={products[22].imageUrl}
                            height="200px"
                            className="all-prod-img"
                          />
                          <h3>{products[22].name}</h3>
                        </Link>
                      </div>
                    </div>

                    <div className="card-container">
                      <div className="card">
                        <Link to={`/products/${products[12].id}`}>
                          <img
                            src={products[12].imageUrl}
                            height="200px"
                            className="all-prod-img"
                          />
                          <h3>{products[12].name}</h3>
                        </Link>
                      </div>
                    </div>

                    <div className="card-container">
                      <div className="card">
                        <Link to={`/products/${products[23].id}`}>
                          <img
                            src={products[23].imageUrl}
                            height="200px"
                            className="all-prod-img"
                          />
                          <h3>{products[23].name}</h3>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </Flickity>
            </div>
            <br />
            <br />
            <br />
            <br />
          </div>
        ) : (
          <div>
            <h3>Welcome, Guest</h3>
            <h2 id="main-header">See What's Popular:</h2>
            <br />
            <div className="card-container">
              <div className="card">
                <Link to="/products">
                  <img
                    src="https://cmsassets.mybluprint.com/dims4/default/af5fa3f/2147483647/strip/true/crop/710x424+0+143/resize/1440x860!/format/webp/quality/90/?url=https%3A%2F%2Fcmsassets.mybluprint.com%2F25%2F6c%2Ff406fc275e54ca619859cea0a3f8%2Fhowtomakecakepops-cakepopswithsprinkles-krisgaliciabrown.jpg"
                    height="200px"
                  />
                  <h3>Explore our Cakepops</h3>
                </Link>
              </div>
              <div className="card">
                <Link to="/products">
                  <img
                    src="https://bakerbynature.com/wp-content/uploads/2017/04/untitled-51-of-68-2.jpg"
                    width="200px"
                  />
                  <h3>See more Cupcakes</h3>
                </Link>
              </div>
              <div className="card">
                <Link to="/products">
                  <img
                    src="https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_5184/https://www.thebakingchocolatess.com/wp-content/uploads/2015/06/2015-06-08-23.46.09.jpg"
                    height="200px"
                  />
                  <h3>Explore our Cookies</h3>
                </Link>
              </div>
              <div className="card">
                <Link to="/products">
                  <img
                    src="https://i.pinimg.com/564x/0a/e8/ff/0ae8ff11e7f4d00b077e6125f724816a.jpg"
                    width="200px"
                  />
                  <h3>See our Chocolates</h3>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: state.user.name,
    // orderHistory: state.cart[0].products
    orderHistory: state.cart,
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => dispatch(getOrderHistory()),
    getCart: () => dispatch(fetchCart()),
    getAllProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
}
