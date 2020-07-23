import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrderHistory} from '../store/saveOrder'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, isLoggedIn} = props
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h3>Welcome, {name}</h3>
          <h2 h2 id="main-header">
            See What's Popular:
          </h2>
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
          <h2>See Your Order History:</h2>
          <h3>Coming Soon</h3>
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: state.user.name
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => dispatch(getOrderHistory())
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
