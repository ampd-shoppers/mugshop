import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route, RouteHandler, Link} from 'react-router'
import {logout, clearCart} from '../store'
import {Button, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap'
import BSNavbar from 'react-bootstrap/Navbar'
import {withRouter, Switch} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import Routes from '../routes'
import classNames from '../../public/style.css'

const Navbar = ({handleClick, isLoggedIn, cart, email, name, admin}) => {
  let numItems = cart.length
  console.log(name)
  return (
    <BSNavbar
      fill="true"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      sticky="top"
      className={classNames.NavBarStyle}
      style={{position: 'sticky'}}
    >
      <BSNavbar.Brand>
        {email && <span>Welcome, {name} !</span>}{' '}
        {!email && <span>Welcome Guest!</span>}
      </BSNavbar.Brand>
      <Nav className="justify-content-end">
        <LinkContainer to="/mugs/page/1">
          <Nav.Link>Mugs</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/cart">
          <Nav.Link>Cart ({numItems})</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/orders">
          <Nav.Link> Orders </Nav.Link>
        </LinkContainer>
        <NavDropdown title="Profile" id="basic-nav-dropdown">
          <LinkContainer to="/signup">
            <Nav.Link> Sign Up </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link> Login </Nav.Link>
          </LinkContainer>
          <LinkContainer onClick={handleClick} to="/login">
            <Nav.Link> Logout </Nav.Link>
          </LinkContainer>
          {admin &&
            admin === 'Admin' && (
              <LinkContainer to="/admin">
                <Nav.Link> Admin Page </Nav.Link>
              </LinkContainer>
            )}
        </NavDropdown>
      </Nav>
    </BSNavbar>
    // </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    email: state.user.email,
    name: state.user.firstName,
    admin: state.user.permissionLevel
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      console.log('is called?')
      dispatch(logout())
      dispatch(clearCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
