import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeCartItem, updateMug, setFilter} from '../store'
import classNames from '../../public/style.css'
import {Dropdown, Button, Form} from 'react-bootstrap'

export class Filter extends Component {
  constructor() {
    super()
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event) {
    this.props.visibilityFilter(event.target.value)
  }
  render() {
    return (
      <div style={{display: 'flex'}} className={classNames.filterDropdown}>
        <Form.Control
          as="select"
          onChange={event => this.handleSelect(event)}
          name="tag"
          defaultValue="Show All"
          style={{width: '10vw'}}
        >
          <option value="Show All">Show All</option>
          {this.props.tags.filter(tag => tag.category === 'type').map(item => (
            <option key={item.id} value={item.tag}>
              {item.tag}
            </option>
          ))}
        </Form.Control>
      </div>
    )
  }
}

const mapState = state => {
  return {
    tags: state.tags
  }
}
const mapDispatch = dispatch => {
  return {
    visibilityFilter: visFilter => {
      return dispatch(setFilter(visFilter))
    }
  }
}

export default connect(mapState, mapDispatch)(Filter)
