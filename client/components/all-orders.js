import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store'
import {Button, Image, InputGroup, FormControl, Form} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import {Link} from 'react-router-dom'

export class AllOrders extends Component {
  async componentDidMount() {
    await this.props.fetchOrders()
  }

  render() {
    console.log('this.props in all orders', this.props)
    let renderOrders
    if (this.props.from === 'user') {
      renderOrders = this.props.orders
    } else if (this.props.from === 'admin') {
      renderOrders = this.props.adminOrders
    }
    return (
      <div>
        {this.props.from === 'user' && <h1>Order History</h1>}
        {this.props.from === 'admin' && <h1>Admin View All Order History</h1>}
        <ListGroup variant="flush">
          {renderOrders &&
            renderOrders.map(order => (
              <div key={order.orderId} order={order}>
                <div>
                  <ListGroup.Item>
                    {console.log('orders: ', order)}
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
                          // onChange={this.handleChange}
                          name="progress"
                          defaultValue={order.progress}
                          style={{width: '10vw'}}
                        >
                          <option value="Created">Created</option>
                          <option value="Processing">Processing</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </Form.Control>
                      </div>
                    )}
                  </ListGroup.Item>
                </div>
              </div>
            ))}
        </ListGroup>
      </div>
    )
  }
}
const mapState = state => {
  return {
    orders: state.orders,
    adminOrders: state.admin.orders
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => dispatch(getAllOrders())
  }
}

export default connect(mapState, mapDispatch)(AllOrders)
