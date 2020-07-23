import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import CartMain from './components/cart/cartMain'
import CartList from './components/cart/cartList'
import CartProducts from './components/cart/cartProducts'
import CartQuantity from './components/cart/cartQuantity'
import UserForm from './components/Checkout/userForm'
import AllUsers from './components/Admin/users'
import {Login, Signup, UserHome, SingleProduct, AllProducts} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div className="neutral">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={AllProducts} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/cart/checkout" component={UserForm} />
          <Route exact path="/cart" component={CartMain} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/home" component={UserHome} />
              <Route exact path="/users" component={AllUsers} />
              <Route exact path="/products" component={AllProducts} />
              <Route
                exact
                path="/products/:productId"
                component={SingleProduct}
              />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
