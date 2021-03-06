import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import {Col, Row} from 'react-bootstrap'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Axios from 'axios'
import CartCard from './cart-card'

import classNames from '../../public/style.css'

import {connect} from 'react-redux'
import {getCart, checkoutCart} from '../store'

export class Cart extends Component {
  constructor() {
    super()
    this.total = this.total.bind(this)
    this.state = {toggleStripe: false}
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchCart()
  }

  total() {
    return this.props.cart.reduce((accum, item) => {
      accum += item.quantity * item.mug.currentPrice
      return accum
    }, 0)
  }

  handleClick() {
    console.log('handle clicked??')
    this.setState(state => ({
      toggleStripe: !state.toggleStripe
    }))
  }

  render() {
    console.log(this.props.cart)
    return (
      <div>
        <Row>
          <Col>
            <h1>Shopping Cart</h1>
            <h4>Cart Total: ${this.total().toFixed(2)}</h4>
            <Button
              disabled={!this.props.cart[0]}
              onClick={() => this.handleClick()}
              // onClick={() => this.props.checkout()}
            >
              Checkout
            </Button>
          </Col>
        </Row>
        <ListGroup variant="flush" className={classNames.cartListGroup}>
          {this.props.cart &&
            this.props.cart.map(item => (
              <CartCard key={item.mugId} item={item} />
            ))}
        </ListGroup>
        {this.state.toggleStripe ? (
          <StripeProvider apiKey="pk_test_PxDiT4TDQL5PHvFhZPumL8fM00SuSW09RX">
            <div>
              <Elements>
                <CheckoutForm checkoutProp={this.props.checkout} />
              </Elements>
            </div>
          </StripeProvider>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {cart: state.cart}
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(getCart()),
    checkout: () => dispatch(checkoutCart())
  }
}
export default connect(mapState, mapDispatch)(Cart)
