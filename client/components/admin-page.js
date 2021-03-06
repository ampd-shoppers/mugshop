import React, {Component} from 'react'
import {Button, Card, Nav, ListGroup} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import classNames from '../../public/style.css'
import Axios from 'axios'
import {adminAllOrders, adminAllUsers, adminAllMugs} from '../store'
import {connect} from 'react-redux'

export class AdminPage extends Component {
  constructor() {
    super()
    this.state = {
      orders: [],
      users: [],
      allmugs: []
    }
  }
  async componentDidMount() {
    this.props.fetchAdminOrders()
    this.props.fetchAdminUsers()
    this.props.fetchAdminMugs()
    let allOrders = await Axios.get('api/orders/all')
    let allUsers = await Axios.get('api/users/all')
    let allMugs = await Axios.get('api/mugs/')
    if (
      allOrders.data ===
      'You are not an Admin. Please log in or contact support if this is not correct'
    ) {
      this.setState({
        orders: 'N/A',
        users: 'N/A',
        allmugs: 'N/A'
      })
    } else {
      this.setState({
        orders: allOrders.data,
        users: allUsers.data,
        allmugs: allMugs.data
      })
    }
  }
  render() {
    return (
      <div className={classNames.admin}>
        <h1>Admin Home Page</h1>
        <div className={`${classNames.adminOverview} container`}>
          <h4>Overview Summary</h4>
          <div className="row justify-content-around">
            <div className={`${classNames.adminData} col-sm`}>
              <h3>Orders</h3>
              <h1>
                {this.state.orders === 'N/A' ? 'N/A' : this.state.orders.length}
              </h1>
            </div>
            <div className={`${classNames.adminData} col-sm`}>
              <h3>Users</h3>
              <h1>
                {this.state.orders === 'N/A' ? 'N/A' : this.state.users.length}
              </h1>
            </div>
            <div className={`${classNames.adminData} col-sm`}>
              <h3>Products</h3>
              <h1>
                {this.state.orders === 'N/A'
                  ? 'N/A'
                  : this.state.allmugs.length}
              </h1>
            </div>
          </div>
        </div>
        {/* //EDIT MENU */}
        <div className={`${classNames.adminOverview} container`}>
          <h4>Edit Orders, Users, and Products</h4>
          <div className="row justify-content-around">
            <div className="col-sm">
              <ListGroup>
                <ListGroup.Item>
                  <h5>Orders</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <LinkContainer to="/admin/orders/all">
                    <Nav.Link>View All Orders</Nav.Link>
                  </LinkContainer>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="col-sm">
              <ListGroup>
                <ListGroup.Item>
                  <h5>Users</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <LinkContainer to="/admin/users/all">
                    <Nav.Link>View All Users</Nav.Link>
                  </LinkContainer>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="col-sm">
              <ListGroup>
                <ListGroup.Item>
                  <h5>Products</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <LinkContainer to="/admin/mugs/new">
                    <Nav.Link>Add New Mug</Nav.Link>
                  </LinkContainer>
                </ListGroup.Item>
                <ListGroup.Item>
                  <LinkContainer to="/admin/mugs/all">
                    <Nav.Link>View All Mugs</Nav.Link>
                  </LinkContainer>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAdminOrders: id => dispatch(adminAllOrders(id)),
    fetchAdminUsers: () => dispatch(adminAllUsers()),
    fetchAdminMugs: () => dispatch(adminAllMugs())
  }
}

export default connect(null, mapDispatch)(AdminPage)
