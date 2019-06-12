import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route, RouteHandler, Link} from 'react-router'
import {logout} from '../store'
import {Button, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap'
import BSNavbar from 'react-bootstrap/Navbar'
import {withRouter, Switch} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import Routes from '../routes'

const Navbar = ({handleClick, isLoggedIn}) => (
  <BSNavbar
    fill="true"
    collapseOnSelect
    expand="lg"
    bg="light"
    sticky="top"
    className="justify-content-center"
  >
    <LinkContainer to="/home">
      <BSNavbar.Brand>MugShop</BSNavbar.Brand>
    </LinkContainer>
    <LinkContainer to="/mugs">
      <Nav> Mugs </Nav>
    </LinkContainer>
    <LinkContainer to="/signup">
      <Nav> Sign Up </Nav>
    </LinkContainer>
    <LinkContainer to="/login">
      <Nav> Login </Nav>
    </LinkContainer>
  </BSNavbar>
)

//  <LinkContainer to="/api/mugs">
//     <NavItem>Mugs</NavItem>
//   </LinkContainer>

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>MugShop ☕</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
