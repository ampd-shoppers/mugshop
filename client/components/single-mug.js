import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Axios from 'axios'
import classNames from '../../public/style.css'

export default class SingleMug extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mug: {}
    }
  }

  async componentDidMount() {
    let oneMug = await Axios.get(`/api/mugs/${this.props.match.params.mugId}`)
    this.setState({mug: oneMug.data})
    console.log(this.state)
  }

  render() {
    return (
      <div className={classNames.singleMugDisplay}>
        <div style={{width: '200rem'}}>
          <Image src={this.state.mug.imgSRC} fluid />
        </div>
        <div style={{width: '30rem'}} />
        <Card style={{width: '200rem'}}>
          <Card.Body>
            <Card.Title>{this.state.mug.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
