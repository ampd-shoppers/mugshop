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
    console.log(this.props)
    return (
      <div>
        <h1>Order History</h1>
        <ListGroup variant="flush">
          {this.props.orders &&
            this.props.orders.map(order => (
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
                  </ListGroup.Item>
                </div>
              </div>
            ))}

          {/* <div> */}
          {/* <h1>Order History</h1>
        <h2>Order Number: {this.props.orders[0] && this.props.orders[0].id}</h2>
        <h2>Total Cost: ${this.props.orders && this.props.orders.map(order => <div key={order.id} order={order} />)}</h2> */}
          {/* <h2>Total Cost: ${this.props.orders[0] && this.props.orders[0].dollarTotal}</h2> */}

          {/* </div> */}
        </ListGroup>
      </div>
    )
  }
}
const mapState = state => {
  return {orders: state.orders}
}

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => dispatch(getAllOrders())
  }
}

export default connect(mapState, mapDispatch)(AllOrders)
