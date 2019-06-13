import React, {Component} from 'react'
import {Button, ListGroup, Image} from 'react-bootstrap'
import Axios from 'axios'
import classNames from '../../public/style.css'

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
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <ListGroup.Item className={classNames.cartListGroupItem}>
        <Image
          src={this.props.item.mug.imgSRC}
          rounded
          fluid
          className={classNames.cartImg}
        />
        <div className={classNames.cartText}>
          <h4>{this.props.item.mug.name}</h4>
          <p>Quantity: {this.props.item.quantity}</p>
        </div>
        <div className={classNames.cartText}>
          <h4>${this.props.item.mug.currentPrice}</h4>
        </div>
        <Button
          variant="info"
          onClick={() => this.deleteItem(this.props.item.mugId)}
          className={classNames.cartButton}
        >
          X Remove from Cart
        </Button>
      </ListGroup.Item>
    )
  }
}

export default CartCard
