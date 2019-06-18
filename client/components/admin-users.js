import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import AdminUsersCard from './admin-users-card'
import classNames from '../../public/style.css'

export class AdminUsers extends Component {
  render() {
    return (
      <div className={classNames.adminUserDiv}>
        <Table striped bordered hover className={classNames.adminUserTable}>
          <thead>
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Access Level</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => (
              <AdminUsersCard key={user.id} user={user} from="admin" />
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
const mapState = state => {
  return {
    users: state.admin.users
  }
}

export default connect(mapState)(AdminUsers)
