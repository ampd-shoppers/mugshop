import React, {Component} from 'react'
import {
  Button,
  ListGroup,
  Image,
  InputGroup,
  FormControl,
  Form,
  Card
} from 'react-bootstrap'
import Axios from 'axios'
import classNames from '../../public/style.css'

export default class SingleOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: {}
    }
  }
  async componentDidMount() {
    let oneOrder = await Axios.get(
      `/api/orders/${this.props.match.params.orderId}`
    )
    this.setState({order: oneOrder.data})
    console.log(this.state)
  }

  render() {
    console.log('this state: ', this.state)
    return (
      <div>
        <ListGroup variant="flush">
          {this.state.order[0] &&
            this.state.order.map(order => (
              <ListGroup.Item key={order.orderId} order={order}>
                <ListGroup.Item className={classNames.cartListGroupItem}>
                  {console.log('single order: ', order)}
                  <Image
                    src={order.mug.imgSRC}
                    rounded
                    fluid
                    className={classNames.cartImg}
                  />
                  <div className={classNames.cartText}>
                    <h4>{order.mug.name}</h4>
                    <h4>Purchased at: ${order && order.purchasePrice}</h4>
                    <h4>Quantity: {order && order.quantity}</h4>
                  </div>
                  {/* <ListGroup.Item key={order.mugId}>{order.mug.purchasePrice}</ListGroup.Item> */}
                </ListGroup.Item>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    )
  }
}
