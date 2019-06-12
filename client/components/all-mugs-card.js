import React from 'react'
import {Button, Card} from 'react-bootstrap'

export const AllMugsCard = props => {
  return (
    <div>
      <Card bg="light" style={{width: '18rem'}}>
        <Card.Img variant="top" src={props.mug.imgSRC} />
        <Card.Body>
          <Card.Title>{props.mug.name}</Card.Title>
          <Card.Subtitle>${props.mug.currentPrice}</Card.Subtitle>
          <Card.Text>We can add some text about the mug?</Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AllMugsCard
