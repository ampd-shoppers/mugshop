import React, {Component} from 'react'
import {Button, Card, InputGroup, Form, FormControl} from 'react-bootstrap'
import classNames from '../../public/style.css'
import {connect} from 'react-redux'
import Axios from 'axios'
import {addNewMug} from '../store'

export class AdminMugForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      currentPrice: '',
      stock: '',
      imgSRC: '',
      status: '',
      update: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }
  async handleSubmit(event) {
    event.preventDefault()
    let response
    if (!this.state.update) {
      response = await Axios.post('/api/mugs', this.state)
      this.setState({
        name: '',
        currentPrice: '',
        stock: '',
        imgSRC: '',
        status: response.statusText
      })
    } else {
      response = await Axios.put(
        `/api/mugs/${this.props.location.state.mug.id}`,
        this.state
      )
      this.setState({
        status: response.statusText
      })
    }
    setTimeout(() => {
      this.setState({
        status: ''
      })
    }, 1500)
  }

  componentDidMount() {
    if (this.props.location.state) {
      console.log('hi from if')
      const {mug} = this.props.location.state

      this.setState({
        name: mug.name,
        currentPrice: mug.currentPrice,
        stock: mug.stock,
        imgSRC: mug.imgSRC,
        update: true
      })
    }
  }
  render() {
    console.log('this.state: ', this.state)
    return (
      <div style={{justifyContent: 'center', display: 'flex'}}>
        <Form
          onSubmit={this.handleSubmit}
          style={{width: '50vw'}}
          className={classNames.mugForm}
        >
          <Form.Label>Name:</Form.Label>
          <Form.Control
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Enter name of mug"
          />
          <Form.Label>Current Price</Form.Label>
          <Form.Control
            name="currentPrice"
            value={this.state.currentPrice}
            onChange={this.handleChange}
            placeholder="Enter Price of Mug"
            type="number"
          />
          <Form.Text className="text-muted">
            Must be a number (don't include $)
          </Form.Text>
          <Form.Label>Stock</Form.Label>
          <Form.Control
            name="stock"
            value={this.state.stock}
            onChange={this.handleChange}
            placeholder="Enter # of Mugs in Stock"
          />
          <Form.Label>Image Link</Form.Label>
          <Form.Control
            name="imgSRC"
            value={this.state.imgSRC}
            onChange={this.handleChange}
            placeholder="Link to Image of Mug"
          />
          <Button variant="primary" type="submit">
            {!this.state.update && 'Add Mug'}
            {this.state.update && 'Update Mug'}
          </Button>
          {!this.state.update && this.state.status === 'OK' ? (
            <h3>Mug Added Successfully</h3>
          ) : (
            ''
          )}
          {this.state.update && this.state.status === 'OK' ? (
            <h3>Mug Updated Successfully</h3>
          ) : (
            ''
          )}
        </Form>
        <div />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addMug: mug => dispatch(addNewMug(mug))
  }
}

export default connect(null, mapDispatch)(AdminMugForm)
