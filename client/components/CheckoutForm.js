import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import ThankYou from './thank-you'
import {BrowserRouter as Router, Redirect, withRouter} from 'react-router-dom'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      redirect: false
    }
    this.submit = this.submit.bind(this)
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  // Renders the portion of the component that will cause the redirect...
  renderRedirectToThankYou = () => {
    if (this.state.redirect) {
      return <Redirect to="user/checkout/success" />
    }
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })
    await this.props.checkoutProp()
    if (response.ok) {
      console.log('Purchase Complete!')
      this.setRedirect()
    }
  }

  render() {
    if (this.state.complete)
      return (
        <div>
          <h1>Purchase Complete</h1>
          <ThankYou />
        </div>
      )

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
        {this.renderRedirectToThankYou()}
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
