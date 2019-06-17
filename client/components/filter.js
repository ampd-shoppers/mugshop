import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeCartItem, updateMug, setFilter} from '../store'
import classNames from '../../public/style.css'
import {Dropdown, Button} from 'react-bootstrap'

export class Filter extends Component {
  render() {
    return (
      <div style={{display: 'flex'}} className={classNames.filterDropdown}>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Filter By Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.props.tags
              .filter(tag => tag.category === 'type')
              .map(item => (
                <Dropdown.Item key={item.id}>{item.tag}</Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        {/* <Button onClick={() => this.props.visibilityFilter('SHOW_TYPE')}> */}
        <Button onClick={() => this.props.visibilityFilter('Handmade')}>
          Type Handmade
        </Button>
        <Button onClick={() => this.props.visibilityFilter('Show All')}>
          Show All
        </Button>
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
