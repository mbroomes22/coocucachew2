//stripe test cards: https://stripe.com/docs/testing#cards
import React from 'react'
import Purchase from './stripePay'

export default class PaymentInfo extends React.Component {
  continue = evt => {
    evt.preventDefault()
    this.props.nextStep()
  }

  goBack = evt => {
    evt.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <div>
        <br />
        <button type="submit" onClick={this.goBack} className="buttonC">
          Return to Shipping Details
        </button>
        <h1 className="header">Enter Payment Details with Stripe</h1>
        <Purchase />
        <br />
        <button type="submit" onClick={this.continue} className="buttonC">
          Continue to Confirmation
        </button>
      </div>
    )
  }
}
