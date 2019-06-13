import React, {Component} from 'react'
import AllMugsCard from './all-mugs-card'
import CardGroup from 'react-bootstrap/CardGroup'
import Axios from 'axios'
import classNames from '../../public/style.css'

export class AllMugs extends Component {
  constructor() {
    super()
    this.state = {
      mugs: []
    }
  }
  //TODO: Add in the right props (map from state??)
  async componentDidMount() {
    const response = await Axios.get('/api/mugs')
    console.log(response)
    // const mugs = response.data;
    this.setState({mugs: response.data})
    //console.log(this.state.mugs[0])
  }
  render() {
    console.log(classNames.label)
    return (
      <div>
        <CardGroup className={classNames.cardGroupMugs}>
          {/* TODO: relink to correct mugs list not dummy data */}
          {this.state.mugs.map(mug => <AllMugsCard key={mug.id} mug={mug} />)}
        </CardGroup>
      </div>
    )
  }
}

export default AllMugs
