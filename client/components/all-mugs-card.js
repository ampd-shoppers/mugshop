import React, {Component} from 'react'
import {Button, Card, InputGroup, FormControl} from 'react-bootstrap'
import Axios from 'axios'
import classNames from '../../public/style.css'

export class AllMugsCard extends Component {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
  }
  async handleAdd(id) {
    console.log('hi from handleAdd in AllMugsCard')
    await Axios.post('/api/cart/', {
      mugId: id,
      qty: 1
    })
    // console.log(id)
  }
  render() {
    return (
      <div>
        <Card bg="light" style={{width: '18rem', margin: '.25rem'}}>
          <Card.Img variant="top" src={this.props.mug.imgSRC} />
          <Card.Body>
            <Card.Title className={classNames.cardTitleMugs}>
              {this.props.mug.name}
            </Card.Title>
            <Card.Subtitle>${this.props.mug.currentPrice}</Card.Subtitle>
            <Card.Text>We can add some text about the mug?</Card.Text>
            <InputGroup className="mb-1">
              <FormControl
                defaultValue="1"
                aria-label="qty"
                aria-describedby="basic-addon2"
                style={{width: '23%', flex: 'none'}}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Qty</Button>
              </InputGroup.Append>
            </InputGroup>
            <Button
              variant="primary"
              onClick={() => this.handleAdd(this.props.mug.id)}
            >
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default AllMugsCard
// export default AllMugsCard
