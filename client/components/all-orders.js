import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store'
import {Button, Image, InputGroup, FormControl, Form} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import {Link} from 'react-router-dom'
import AllOrdersCard from './all-orders-card'

export class AllOrders extends Component {
  async componentDidMount() {
    await this.props.fetchOrders()
  }

  render() {
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
              <AllOrdersCard
                key={order.id}
                order={order}
                from={this.props.from}
              />
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
