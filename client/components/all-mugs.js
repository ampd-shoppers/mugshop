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
    console.log('mug props: ', this.props)
    this.props.fetchAllMugs(this.props.match.params.pageNum)
    this.props.fetchAllTags()
  }

  componentDidUpdate() {}

  render() {
    // console.log(this.props.mugs[0] && this.props.mugs[4].tags)
    console.log(this.props)
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
  // console.log('state.filter: ',state.tags)
  console.log('Show Type:', showType[0] && showType[0].mugs)
  // console.log('tagName:', (state.mugs[4] && state.mugs[4].tags[1].tag===state.filter))
  const filterFunc = function() {
    if (state.filter === 'Handmade') {
      console.log('in if statement')
      return showType[0].mugs
    }
    return state.mugs
  }

  return {
    mugs: filterFunc()
  }
  // return {mugs: state.mugs, filter: state.filter}
}

const mapDispatch = dispatch => {
  return {
    fetchAllMugs: pageNum => dispatch(getAllMugs(pageNum)),
    fetchAllTags: () => dispatch(getAllTags())
  }
}

export default connect(mapState, mapDispatch)(AllMugs)
