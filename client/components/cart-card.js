import React, {Component} from 'react'
import {Button, ListGroup} from 'react-bootstrap'
import Axios from 'axios'

export class CartCard extends Component {
  constructor() {
    super()
    this.state = {
      cartItem: []
    }
    this.deleteItem = this.deleteItem.bind(this)
  }

  async deleteItem(id) {
    try {
      console.log('id: ', id)
      await Axios.delete(`/api/cart/user/${id}`)
      // const response = await Axios.get('/api/cart/user')
      // this.setState({cartItem: response.data})
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <ListGroup.Item>
        {this.props.mug.mugId}{' '}
        <Button onClick={() => this.deleteItem(this.props.mug.mugId)}>
          Delete
        </Button>
      </ListGroup.Item>
    )
  }
}

export default CartCard
