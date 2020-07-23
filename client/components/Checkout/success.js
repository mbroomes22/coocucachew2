// confirmation page and email
//props should access user email info and order number
import React from 'react'
import {Link} from 'react-router-dom'

const Success = () => {
  return (
    <div>
      {/* <p>Your order id: {props.orders.id}</p> */}
      <h1>Thanks for your order!</h1>
      <h4>An order confirmation has been sent to your email.</h4>
      <Link to="/home">
        <p>Return Home</p>
      </Link>
    </div>
  )
}

export default Success
