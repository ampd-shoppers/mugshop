import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Form, Col, Row, Button} from 'react-bootstrap'
import {updateUser} from '../store'
import {Route, Redirect, withRouter} from 'react-router'

export class AdminMugsCard extends Component {
  constructor() {
    super()
    this.state = {}
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // componentDidMount() {
  //   this.setState({
  //     id: this.props.mug.id,
  //     name: this.props.mug.name,
  //     currentPrice: this.props.mug.currentPrice,
  //     stock: this.props.mug.stock,
  //     imageSRC: this.props.mug.imageSRC
  //   })
  // }

  // handleChange(event) {
  //   try {
  //     this.setState({
  //       [event.target.name]: event.target.value
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
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
      // <Form.Row>
      //   <Col size="sm">
      //     <Form.Label>ID</Form.Label>
      //     <Form.Control size="sm" defaultValue={mug.id} disabled/>
      //   </Col>
      //   <Col>
      //     <Form.Label>Name</Form.Label>
      //     <Form.Control defaultValue={mug.name} />
      //   </Col>
      //   <Col>
      //     <Form.Label>Current Price</Form.Label>
      //     <Form.Control defaultValue={mug.currentPrice} />
      //   </Col>
      //   <Col >
      //     <Form.Label>Remaining Stock</Form.Label>
      //     <Form.Control defaultValue={mug.stock} />
      //   </Col>
      //   <Col>
      //     <Form.Label>Image Link</Form.Label>
      //     <Form.Control defaultValue={mug.imgSRC} />
      //   </Col>
      //   <Button>Submit</Button>
      // </Form.Row>
      // <tr>
      //   <td>{mug.id}</td>
      //   <td>
      //     <Form.Control
      //       handleChange={this.handleChange}
      //       defaultValue={mug.name}
      //     />
      //   </td>
      //   <td>
      //     <Form.Control
      //       handleChange={this.handleChange}
      //       defaultValue={mug.currentPrice}
      //     />
      //   </td>
      //   <td>
      //     <Form.Control
      //       handleChange={this.handleChange}
      //       defaultValue={mug.stock}
      //     />
      //   </td>
      //   <td>
      //     <Form.Control
      //       handleChange={this.handleChange}
      //       defaultValue={mug.imgSRC}
      //     />
      //   </td>
      //   <td>
      //     <Button onClick={this.handleSubmit} type="submit" variant="primary">
      //       Submit
      //     </Button>
      //   </td>
      // </tr>
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
const mapDispatch = dispatch => {
  return {
    // fetchUpdatedUser: (userId, permissionLevel) =>
    //   dispatch(updateUser(userId, permissionLevel))
  }
}
export default withRouter(connect(null, mapDispatch)(AdminMugsCard))
