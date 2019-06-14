import React, {Component} from 'react'
import AllMugsCard from './all-mugs-card'
import CardGroup from 'react-bootstrap/CardGroup'
import Axios from 'axios'
import classNames from '../../public/style.css'
import {Button} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'

import {connect} from 'react-redux'
import {getAllMugs, getAllTags} from '../store'

export class AllMugs extends Component {
  componentDidMount() {
    console.log('mug props: ', this.props)
    this.props.fetchAllMugs(this.props.match.params.pageNum)
    this.props.fetchAllTags()
  }

  componentDidUpdate() {}

  render() {
    console.log(this.props)
    return (
      <div>
        <CardGroup className={classNames.cardGroupMugs}>
          {this.props.mugs &&
            this.props.mugs.map(mug => <AllMugsCard key={mug.id} mug={mug} />)}
        </CardGroup>

        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>
            {this.props.match.params.pageNum - 1}
          </Pagination.Item>
          <Pagination.Item active>
            {this.props.match.params.pageNum}
          </Pagination.Item>
          <Pagination.Item>
            {this.props.match.params.pageNum + 1}
          </Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    )
  }
}

const mapState = state => {
  return {mugs: state.mugs}
}

const mapDispatch = dispatch => {
  return {
    fetchAllMugs: pageNum => dispatch(getAllMugs(pageNum)),
    fetchAllTags: () => dispatch(getAllTags())
  }
}

export default connect(mapState, mapDispatch)(AllMugs)
