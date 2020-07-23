import React, {Component} from 'react'

export default class UserDetails extends Component {
  continue = evt => {
    evt.preventDefault()
    this.props.nextStep()
  }

  required = evt => {
    if (this.props.values.name && this.props.values.email) {
      this.continue(evt)
    } else {
      alert('First Name and Email are required')
    }
  }

  render() {
    const {values, handleChange} = this.props
    return (
      <div>
        <h1 className="header">Enter Shipping Details</h1>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={values.name}
            className="field"
            required
          />
          <br />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={values.email}
            className="field"
            required
          />
          <br />
        </label>
        <label>
          Street Address:
          <input
            type="text"
            name="streetAddress"
            placeholder="Address (optional)"
            onChange={handleChange}
            value={values.streetAddress}
            className="field"
          />
          <br />
        </label>
        <label>
          ZIP code:
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP code (optional)"
            onChange={handleChange}
            value={values.zipCode}
            className="field"
          />
          <br />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            placeholder="State (optional)"
            onChange={handleChange}
            value={values.state}
            className="field"
          />
          <br />
        </label>
        <button type="submit" onClick={this.required} className="buttonC">
          Continue to Payment Details
        </button>
      </div>
    )
  }
}
