import React, {Component} from 'react'
import {Button, Card, InputGroup, FormControl} from 'react-bootstrap'
import Axios from 'axios'
import classNames from '../../public/style.css'
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'
import {removeCartItem, updateMug, addNewMug} from '../store'

export class AllMugsCard extends Component {
  constructor() {
    super()
    this.state = {
      adding: false
    }
    this.handleAdd = this.handleAdd.bind(this)
  }
  async handleAdd(id) {
    this.setState({adding: true})

    await setTimeout(async () => {
      let response = await this.props.addMugCart(id)
      // if(response ==="Already In Cart"){

      // }
      // console.log('set Time out response this.props', response)
      this.setState({adding: false})
    }, 500)
  }

  render() {
    return (
      <div>
        <Card bg="light" style={{width: '18rem', margin: '.25rem'}}>
          <LinkContainer to={`/mugs/${this.props.mug.id}`}>
            <Card.Img variant="top" src={this.props.mug.imgSRC} />
          </LinkContainer>
          <Card.Body>
            <LinkContainer to={`/mugs/${this.props.mug.id}`}>
              <Card.Title className={classNames.cardTitleMugs}>
                {this.props.mug.name}
              </Card.Title>
            </LinkContainer>
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
              {!this.state.adding && 'Add to Cart'}
              {this.state.adding && 'Adding...'}
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    deleteCartItem: id => dispatch(removeCartItem(id)),
    updateQty: (mugId, qty) => dispatch(updateMug(mugId, qty)),
    addMugCart: mugId => dispatch(addNewMug(mugId))
  }
}
export default connect(null, mapDispatch)(AllMugsCard)
