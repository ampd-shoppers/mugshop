import React, {Component} from 'react'
import AllMugsCard from './all-mugs-card'
import CardGroup from 'react-bootstrap/CardGroup'
import Axios from 'axios'
import classNames from '../../public/style.css'
import {Button} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'

import {connect} from 'react-redux'
import {getAllMugs, getAllTags, logout} from '../store'
import Filter from './filter'

export class AllMugs extends Component {
  componentDidMount() {
    this.props.fetchAllMugs(this.props.match.params.pageNum)
    this.props.fetchAllTags()
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <Filter />
        <CardGroup className={classNames.cardGroupMugs}>
          {this.props.mugs &&
            this.props.mugs.map(mug => <AllMugsCard key={mug.id} mug={mug} />)}
        </CardGroup>

        <Pagination className={classNames.pageFooter}>
          <Pagination.Item
            href={'/mugs/page/' + (Number(this.props.match.params.pageNum) - 1)}
          >
            Prev
          </Pagination.Item>
          <Pagination.Item active>
            {this.props.match.params.pageNum}
          </Pagination.Item>
          <Pagination.Item
            href={'/mugs/page/' + (Number(this.props.match.params.pageNum) + 1)}
          >
            Next
          </Pagination.Item>
        </Pagination>
      </div>
    )
  }
}

const mapState = state => {
  const showType = state.tags.filter(tag => tag.tag === state.filter)

  const filterFunc = function() {
    if (state.filter === 'Show All') {
      return state.mugs
    }
    return showType[0].mugs
  }

  return {
    mugs: filterFunc()
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllMugs: pageNum => dispatch(getAllMugs(pageNum)),
    fetchAllTags: () => dispatch(getAllTags())
  }
}

export default connect(mapState, mapDispatch)(AllMugs)
