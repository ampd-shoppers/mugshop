import React, {Component} from 'react'
import {
  Button,
  ListGroup,
  Image,
  InputGroup,
  FormControl,
  Form,
  Card
} from 'react-bootstrap'
import Axios from 'axios'
import classNames from '../../public/style.css'

export default class SingleOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: {}
    }
  }
  async componentDidMount() {
    let oneOrder = await Axios.get(
      `/api/orders/${this.props.match.params.orderId}`
    )
    this.setState({order: oneOrder.data})
    console.log(this.state)
  }

  render() {
    console.log('this state: ', this.state)
    return (
      <div>
        {this.state.order[0] &&
          this.state.order.map(item => (
            <ListGroup.Item key={item.mugId}>{item.mug.name}</ListGroup.Item>
            //use purchase price
          ))}
      </div>
    )
  }
}
