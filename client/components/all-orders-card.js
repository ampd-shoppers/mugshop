import React, {Component} from 'react'
import {Button, Image, InputGroup, ListGroup, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'
import {updateOrder} from '../store'

export class AllOrdersCard extends Component {
  // constructor() {
  //   super()
  //   this.option = React.createRef()
  // }
  async handleChange(id, event) {
    try {
      const progress = event.target.value
      const orderId = id

      this.props.fetchUpdatedStatus(orderId, progress)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {order} = this.props
    return (
      <ListGroup.Item>
        <h4>
          <Link to={`/orders/${order.id}`}>Order Number: </Link>
          {order && order.id}
        </h4>
        <h4>Date Ordered: {order && order.createdAt}</h4>
        <h4>Total Cost: {order && order.dollarTotal}</h4>
        <h4>Order Status: {order && order.progress}</h4>
        {this.props.from === 'admin' && (
          <div>
            <h4>User Id: {order.userId}</h4>
            <Form.Label>Update Order Status: </Form.Label>
            <Form.Control
              as="select"
              onChange={event => {
                this.handleChange(order.id, event)
              }}
              name="progress"
              defaultValue={order.progress}
              style={{minWidth: '15vw', maxWidth: '15rem'}}
              // ref={this.option}
            >
              <option value="Created">Created</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </div>
        )}
      </ListGroup.Item>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    fetchUpdatedStatus: (orderId, progress) =>
      dispatch(updateOrder(orderId, progress))
  }
}
export default connect(null, mapDispatch)(AllOrdersCard)
