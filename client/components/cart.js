import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Axios from 'axios'
import CartCard from './cart-card'

import classNames from '../../public/style.css'

const cartThings = [
  {
    id: 1,
    name: 'Penguin',
    currentPrice: '4.99',
    quantity: 2,
    imgSRC:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
  },
  {
    id: 2,
    name: 'Cat',
    currentPrice: '2.99',
    quantity: 1,
    imgSRC:
      'https://images.unsplash.com/photo-1539547256500-3c6cfd15bfdb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
  },
  {
    id: 3,
    name: 'Dog',
    currentPrice: '2.99',
    quantity: 1,
    imgSRC:
      'https://images.unsplash.com/photo-1484981138541-3d074aa97716?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
  }
]

export class Cart extends Component {
  //TODO: Add in the right props (map from state??)
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }

  async componentDidMount() {
    const response = await Axios.get('/api/cart/user')
    console.log(response)
    this.setState({cart: response.data})
  }

  render() {
    console.log('this cart for gerry: ', this.state.cart)
    return (
      <div>
        <h1>Shopping Cart</h1>
        <ListGroup variant="flush" className={classNames.cartListGroup}>
          {this.state.cart.map(item => (
            <CartCard key={item.mugId} item={item} />
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default Cart
