import React, {Component} from 'react'
import AllMugsCard from './all-mugs-card'
import CardGroup from 'react-bootstrap/CardGroup'
import Axios from 'axios'
import classNames from '../../public/style.css'
import {Button} from 'react-bootstrap'

import {connect} from 'react-redux'
import {getAllMugs} from '../store'

export class AllMugs extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <CardGroup className={classNames.cardGroupMugs}>
          {this.props.mugs &&
            this.props.mugs.map(mug => <AllMugsCard key={mug.id} mug={mug} />)}
        </CardGroup>
      </div>
      // <Footer>
      // <Button variant="info"
      //   onClick={() => this.deleteItem(this.props.item.mugId)}
      //   className={classNames.cartButton}
      // >Previous</Button>
      // <Button variant="info">Next</Button></Footer>
      // </Footer>
    )
  }
}

const mapState = state => {
  return {mugs: state.mugs}
}

export default connect(mapState)(AllMugs)
