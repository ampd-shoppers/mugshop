import React, {Component} from 'react'
import {Button, ListGroup} from 'react-bootstrap'

export class CartCard extends Component {
  constructor() {
    super()
    this.state = {
      cartItem: []
    }
    this.deleteItem = this.deleteItem.bind(this)
  }

  async componentDidMount() {
    const response = await Axios.get('/api/cart/user')
    console.log(response)
    this.setState({cartItem: response.data})
  }

  async deleteItem(id) {
    console.log('id ', id)
    try {
      await Axios.delete(`/api/cart/`)
      const response = await Axios.get('/api/cart/user')
      this.setState({cartItem: response.data})
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <ListGroup.Item>
        {this.props.mug.mugId} <Button>Delete</Button>
      </ListGroup.Item>
    )
  }
}

export default CartCard
