import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

window.onscroll = function() {
  stickyNav()
}

function stickyNav() {
  if (window.pageYOffset >= 100) {
    navbar.classList.add('sticky')
  } else {
    navbar.classList.remove('sticky')
  }
}

const onClick = () => {
  mySidenav.style.width = '250px'
}

const closeNav = e => {
  e.preventDefault()
  mySidenav.style.width = '0'
}

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="navbar" id="navbar">
    <nav>
      {isLoggedIn ? (
        <div id="navBar-container">
          {/* The navbar will show these links after you log in */}
          <div className="nav-items">
            <div className="left-nav">
              <Link to="/home">Home</Link>
              <div className="dropdown">
                <Link to="/products" className="dropbtn">
                  All Products <i className="fa fa-caret-down" />
                </Link>
                <div className="dropdown-content">
                  <Link to="/products/cookies">Cookies</Link>
                  <Link to="/products/chocolates">Chocolates</Link>
                  <Link to="/products/cakepops">Cakepops</Link>
                  <Link to="/products/cupcakes">Cupcakes</Link>
                </div>
              </div>
            </div>
            <div id="mySidenav" className="mySidenav">
              <a href="" className="closebtn" onClick={closeNav}>
                &times;
              </a>
              <Link to="/home">Home</Link>
              <Link to="/products">All Sweets</Link>
              <div className="extra-sides">
                <Link to="/products/cookies">Cookies</Link>
                <Link to="/products/chocolates">Chocolates</Link>
                <Link to="/products/cakepops">Cakepops</Link>
                <Link to="/products/cupcakes">Cupcakes</Link>
              </div>
              {isAdmin ? (
                <Link to="/users">Users</Link>
              ) : (
                <Link to="/cart">Cart</Link>
              )}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
            <a className="nav-icon" onClick={onClick}>
              <span />
              <span />
              <span />
            </a>
            <div className="mid-nav">
              <h1>Coocucachew</h1>
            </div>
            <div className="right-nav">
              {isAdmin ? (
                <Link to="/users">Users</Link>
              ) : (
                <Link to="/cart">Cart</Link>
              )}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="nav-items">
          {/* The navbar will show these links before you log in */}
          <div className="left-nav">
            <Link to="/products">Home</Link>
          </div>
          <div id="mySidenav" className="mySidenav">
            <a href="" className="closebtn" onClick={closeNav}>
              &times;
            </a>
            <Link to="/products">All Sweets</Link>
            <div className="extra-sides">
              <Link to="/products/cookies">Cookies</Link>
              <Link to="/products/chocolates">Chocolates</Link>
              <Link to="/products/cakepops">Cakepops</Link>
              <Link to="/products/cupcakes">Cupcakes</Link>
            </div>
            {isAdmin ? (
              <Link to="/users">Users</Link>
            ) : (
              <Link to="/cart">Cart</Link>
            )}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
          <a className="nav-icon" onClick={onClick}>
            <span />
            <span />
            <span />
          </a>
          <div className="mid-nav">
            <h1>Coocucachew</h1>
          </div>
          <div className="right-nav">
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
