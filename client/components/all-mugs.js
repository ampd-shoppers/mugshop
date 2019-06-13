import React, {Component} from 'react'
import AllMugsCard from './all-mugs-card'
import CardGroup from 'react-bootstrap/CardGroup'
import Axios from 'axios'
import classNames from '../../public/style.css'

import {connect} from 'react-redux'
import {getAllMugs} from '../store'

export class AllMugs extends Component {
  //TODO: Add in the right props (map from state??)
  async componentDidMount() {
    await this.props.fetchAllMugs()
    // const response = await Axios.get('/api/mugs')
    // console.log(response)
    // // const mugs = response.data;
    // this.setState({mugs: response.data})
    // //console.log(this.state.mugs[0])
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <CardGroup className={classNames.cardGroupMugs}>
          {/* {console.log(this.props)} */}
          {this.props.mugs &&
            this.props.mugs.map(mug => <AllMugsCard key={mug.id} mug={mug} />)}
        </CardGroup>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state in mapState:', state)
  return {mugs: state.mugs}
}

const mapDispatch = dispatch => {
  return {
    fetchAllMugs: () => dispatch(getAllMugs())
  }
}
export default connect(mapState, mapDispatch)(AllMugs)
