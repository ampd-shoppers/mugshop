import React, {Component} from 'react'
import AllMugsCard from './all-mugs-card'
import CardGroup from 'react-bootstrap/CardGroup'
import Axios from 'axios'
// import classNames from '../../public/style.css';

const mugs = [
  {
    id: 1,
    name: 'Penguin',
    currentPrice: '4.99',
    imgSRC:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
  },
  {
    id: 2,
    name: 'Cat',
    currentPrice: '2.99',
    imgSRC:
      'https://images.unsplash.com/photo-1539547256500-3c6cfd15bfdb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
  },
  {
    id: 3,
    name: 'Dog',
    currentPrice: '2.99',
    imgSRC:
      'https://images.unsplash.com/photo-1484981138541-3d074aa97716?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
  },
  {
    id: 4,
    name: 'Dolphin',
    currentPrice: '4.99',
    imgSRC:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
  },
  {
    id: 5,
    name: 'Dinosaur',
    currentPrice: '5.99',
    imgSRC:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0ODYxfQ'
  }
]

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
    return (
      <div>
        <CardGroup>
          {/* TODO: relink to correct mugs list not dummy data */}
          {this.state.mugs.map(mug => <AllMugsCard key={mug.id} mug={mug} />)}
        </CardGroup>
      </div>
    )
  }
}

export default AllMugs
