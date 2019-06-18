import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Form} from 'react-bootstrap'
import AdminMugsCard from './admin-mugs-card'
import classNames from '../../public/style.css'

export class AdminMugs extends Component {
  render() {
    return (
      <div className={classNames.adminUserDiv} style={{width: '95vw'}}>
        {/* <div> */}
        <Table striped bordered hover className={classNames.adminUserTable}>
          <thead>
            <tr>
              <th>Mug Id</th>
              <th>Name</th>
              <th>Current Price</th>
              <th>Stock / Inventory</th>
              <th>Image Url</th>
            </tr>
          </thead>
          <tbody>
            {/* <Form size="sm"> */}
            {this.props.mugs.map(mug => (
              <AdminMugsCard key={mug.id} mug={mug} from="admin" />
            ))}
            {/* </Form> */}
          </tbody>
        </Table>
      </div>
    )
  }
}
const mapState = state => {
  return {
    mugs: state.admin.mugs
  }
}

export default connect(mapState)(AdminMugs)
