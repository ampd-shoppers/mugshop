import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Axios from 'axios'

// const cartThings = [
//   {
//     id: 1,
//     name: 'Penguin',
//     currentPrice: '4.99',
//     quantity: 2,
//     imgSRC:
//       'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
//   },
//   {
//     id: 2,
//     name: 'Cat',
//     currentPrice: '2.99',
//     quantity: 1,
//     imgSRC:
//       'https://images.unsplash.com/photo-1539547256500-3c6cfd15bfdb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
//   },
//   {
//     id: 3,
//     name: 'Dog',
//     currentPrice: '2.99',
//     quantity: 1,
//     imgSRC:
//       'https://images.unsplash.com/photo-1484981138541-3d074aa97716?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
//   }
// ]

export class Cart extends Component {
  //TODO: Add in the right props (map from state??)
  constructor() {
    super()
    this.state = {
      cart: []
    }
    this.deleteItem = this.deleteItem.bind(this)
  }

  async componentDidMount() {
    const response = await Axios.get('/api/cart/user')
    console.log(response)
    this.setState({cart: response.data})
  }

  async deleteItem(id) {
    // console.log('console thang: ', event.target);
    console.log('id ', id)
    try {
      await Axios.delete(`/api/cart/`)
      const response = await Axios.get('/api/cart/user')
      this.setState({cart: response.data})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log('this cart for gerry: ', this.state.cart)
    return (
      <div>
        <h1>Shopping Cart</h1>
        <ListGroup variant="flush">
          {this.state.cart.map(item => (
            <ListGroup.Item key={item.mugId}>
              {/*<Image*/}
              {/*  src={item.imgSRC}*/}
              {/*  rounded*/}
              {/*  fluid*/}
              {/*  style={{height: '100px'}}*/}
              {/*/>{' '}*/}
              {/*{item.name} {item.quantity}*/}
              {item.mugId}
              {/* <button type="button" onClick={() => this.props.deleteItem(id)}>Delete</button> */}
              <Button
                variant="primary"
                onClick={() => this.deleteItems(item.mugId)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default Cart
