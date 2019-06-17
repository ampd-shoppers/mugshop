import React, {Component} from 'react'
import {connect} from 'react-redux'
import AllOrders from './all-orders'

export class AdminOrders extends Component {
  render() {
    return (
      <div>
        <AllOrders from="admin" />
      </div>
    )
  }
}
const mapState = state => {
  return {
    orders: state.admin.orders
  }
}

export default connect(mapState)(AdminOrders)
