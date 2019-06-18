import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Form, Col, Row, Button} from 'react-bootstrap'
import {updateUser} from '../store'
import {Route, Redirect, withRouter} from 'react-router'

export class AdminMugsCard extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    try {
      console.log('this.props handleSubmit', this.props)
      this.props.history.push({
        pathname: '/admin/mugs/update',
        state: {mug: this.props.mug}
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {mug} = this.props
    return (
      <tr>
        <td>{mug.id}</td>
        <td>{mug.name}</td>
        <td>{mug.currentPrice}</td>
        <td>{mug.stock}</td>
        <td>{mug.imgSRC}</td>
        <td>
          <Button onClick={this.handleSubmit} variant="primary">
            Update
          </Button>
        </td>
      </tr>
    )
  }
}

export default withRouter(AdminMugsCard)
