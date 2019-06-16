import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store'

export class AllOrders extends Component {
  async componentDidMount() {
    await this.props.fetchOrders()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>{this.props.orders[0] && this.props.orders[0].id}</h1>
        <h1>{this.props.orders[0] && this.props.orders[0].dollarTotal}</h1>
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
