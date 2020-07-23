import React, {Component} from 'react'
import UserDetails from './shippingDetails'
import PaymentInfo from './paymentDetails'
import ConfirmOrder from './confirmOrder'
import Success from './success'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      name: '',
      email: '',
      streetAddress: '',
      zipCode: '',
      state: ''
    }
  }

  //continue to next step
  nextStep = () => {
    const {step} = this.state
    this.setState({
      step: step + 1
    })
  }

  //go back to previous step
  prevStep = () => {
    const {step} = this.state
    this.setState({
      step: step - 1
    })
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {step, name, email, streetAddress, zipCode, state} = this.state
    const values = {
      name,
      email,
      streetAddress,
      zipCode,
      state
    }

    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 2:
        return (
          <PaymentInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 3:
        return (
          <ConfirmOrder
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            cart={this.props.cart}
            values={values}
          />
        )
      case 4:
        return <Success />
      default:
        return <div>Checkout</div>
    }
  }
}

export default UserForm
