import React, {Component} from 'react'
import {
  Button,
  ListGroup,
  Image,
  InputGroup,
  FormControl,
  Form
} from 'react-bootstrap'
import Axios from 'axios'
import classNames from '../../public/style.css'
import {connect} from 'react-redux'
import {removeCartItem, updateMug} from '../store'

export class CartCard extends Component {
  constructor() {
    super()
    this.state = {
      cartItem: []
    }
    // this.deleteItem = this.deleteItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event) {
    try {
      const qty = event.target.value
      const mugId = this.props.item.mugId
      // let res = await Axios.put(`/api/cart/${mugId}`, {qty})
      this.props.updateQty(mugId, qty)
      // console.log(res.data)
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
          <p>Individual Price: ${this.props.item.mug.currentPrice}</p>
        </div>
        <div className={classNames.cartText}>
          <h5>Total Price: </h5>
          <h5>
            ${(
              this.props.item.quantity * this.props.item.mug.currentPrice
            ).toFixed(2)}
          </h5>
          <p>
            ({this.props.item.quantity}x{this.props.item.mug.currentPrice})
          </p>
        </div>
        <div>
          <Form.Label>Quantity: </Form.Label>
          <Form.Control
            as="select"
            onChange={this.handleChange}
            name="quantity"
            defaultValue={this.props.item.quantity}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option>4</option>
            <option>5</option>
            {/* selected={`${this.value===this.props.item.quantity ? 'selected': ''}`} */}
          </Form.Control>
        </div>
        {this.props.item.mug.stock >= this.props.item.quantity ? (
          <span />
        ) : (
          <span className="alert-text">{this.props.item.mug.stock} left! </span>
        )}

        <Button
          variant="info"
          onClick={() => this.props.deleteCartItem(this.props.item.mugId)}
          className={classNames.cartButton}
        >
          X Remove from Cart
        </Button>
      </ListGroup.Item>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    deleteCartItem: id => dispatch(removeCartItem(id)),
    updateQty: (mugId, qty) => dispatch(updateMug(mugId, qty))
  }
}
export default connect(null, mapDispatch)(CartCard)
