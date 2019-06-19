import React, {Component} from 'react'
import {Image} from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import classNames from '../../public/style.css'
import {Link} from 'react-router-dom'

export class ThankYou extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  async componentDidMount() {}

  render() {
    return (
      <div>
        <Jumbotron className={classNames.successPage}>
          <Image src="../../public/imgs/thank-you-mug-min.jpg" />
          <h1>Thank you for your order!</h1>
          <p>Get your cabinets ready... your order is is on the way.</p>
        </Jumbotron>
      </div>
    )
  }
}

export default ThankYou
