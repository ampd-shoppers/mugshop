import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form} from 'react-bootstrap'
import {updateUser} from '../store'

export class AdminUsersCard extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    try {
      const permissionLevel = event.target.value
      const userId = this.props.user.id
      console.log(userId, permissionLevel)
      //ADD TO REDUCER
      //ADD CONNECT AND MAP DISPATCH
      this.props.fetchUpdatedUser(userId, permissionLevel)
      // console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {user} = this.props
    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>
          <Form.Control
            as="select"
            onChange={this.handleChange}
            name="permissionLevel"
            defaultValue={user.permissionLevel}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Control>
        </td>
      </tr>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    fetchUpdatedUser: (userId, permissionLevel) =>
      dispatch(updateUser(userId, permissionLevel))
  }
}
export default connect(null, mapDispatch)(AdminUsersCard)
