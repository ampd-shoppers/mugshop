import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Axios from 'axios'
import CartCard from './cart-card'

import classNames from '../../public/style.css'

import {connect} from 'react-redux'
import {getCart} from '../store'

export class Cart extends Component {
  constructor() {
    super()
    this.total = this.total.bind(this)
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

  render() {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <h4>Cart Total: ${this.total().toFixed(2)}</h4>
        <ListGroup variant="flush" className={classNames.cartListGroup}>
          {this.props.cart &&
            this.props.cart.map(item => (
              <CartCard key={item.mugId} item={item} />
            ))}
        </ListGroup>
      </div>
    )
  }
}

const mapState = state => {
  return {cart: state.cart}
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(getCart())
  }
}
export default connect(mapState, mapDispatch)(Cart)
