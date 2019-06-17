import React, {Component} from 'react'
import {Button, Card, Accordion} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import classNames from '../../public/style.css'

export class AdminPage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className={classNames.adminData}>One of three columns</div>
            <div className={classNames.adminData}>One of three columns</div>
            <div className={classNames.adminData}>One of three columns</div>
          </div>
        </div>
        <div style={{width: '30vw'}}>
          <h2>Modify Orders or Users</h2>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Manage Orders
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <LinkContainer to="/mugs/order/edit/orderid">
                    <p>Edit Individual Order</p>
                  </LinkContainer>
                  <LinkContainer to="/mugs/orders/all">
                    <span>View All Orders</span>
                  </LinkContainer>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Manage Users
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    )
  }
}

export default AdminPage
