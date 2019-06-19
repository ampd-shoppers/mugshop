import React, {Component} from 'react'
import {
  Button,
  Card,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Popover,
  Overlay
} from 'react-bootstrap'
import Axios from 'axios'
import classNames from '../../public/style.css'
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'
import {removeCartItem, updateMug, addNewMug} from '../store'

export class AllMugsCard extends Component {
  constructor() {
    super()
    this.state = {
      adding: false,
      show: false,
      comment: undefined
    }
    this.attachRef = target => this.setState({target})
    this.handleAdd = this.handleAdd.bind(this)
    this.reset = this.reset.bind(this)
  }

  handleAdd(id) {
    this.setState({adding: true, show: true})

    setTimeout(async () => {
      let response = await this.props.addMugCart(id)
      if (response === 'Already In Cart') {
        this.setState({comment: '  🛒 Already In Cart'})
        this.setState({show: true})
      } else {
        this.setState({comment: ' ✔️ Added!'})
        this.setState({show: true})
      }

      this.setState({adding: false})
      this.reset()
    }, 500)
  }

  reset() {
    setTimeout(() => {
      this.setState({adding: false, show: false, comment: undefined})
    }, 1100)
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
            <hr />
            <Button
              variant="primary"
              onClick={() => this.handleAdd(this.props.mug.id)}
              ref={this.attachRef}
            >
              {!this.state.adding && 'Add to Cart'}
              {this.state.adding && 'Adding...'}
            </Button>
            {this.state.show && this.state.comment}
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
