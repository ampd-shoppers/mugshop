import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me, getAllMugs, getAllTags, logout, getCart} from './store'
import AllMugs from './components/all-mugs'
import Cart from './components/cart'
import SingleMug from './components/single-mug'
import AllOrders from './components/all-orders'
import SingleOrder from './components/single-order'
import AdminPage from './components/admin-page'
import AdminOrders from './components/admin-orders'
import AdminUsers from './components/admin-users'
import AdminMugs from './components/admin-mugs'
import AdminMugForm from './components/admin-mug-form'
import CheckoutForm from './components/CheckoutForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchCart()
    // this.props.fetchAllMugs()
    // this.props.fetchAllTags()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    console.log(isAdmin)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/cart" component={Cart} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route
          path="/mugs/page/:pageNum"
          render={routeProps => <AllMugs {...routeProps} />}
        />
        <Route exact path="/mugs/:mugId" component={SingleMug} />
        <Route
          exact
          path="/orders"
          render={routeProps => <AllOrders {...routeProps} from="user" />}
        />
        <Route path="/orders/:orderId" component={SingleOrder} />
        {isAdmin && (
          <Switch>
            <Route exact path="/home" component={AdminPage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/admin/orders/all" component={AdminOrders} />
            <Route exact path="/admin/users/all" component={AdminUsers} />
            <Route exact path="/admin/mugs/all" component={AdminMugs} />
            <Route exact path="/admin/mugs/new" component={AdminMugForm} />
          </Switch>
        )}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              path="/home"
              render={routeProps => <AllMugs {...routeProps} />}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.permissionLevel === 'Admin'
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchCart: () => dispatch(getCart())
    // fetchAllMugs: () => dispatch(getAllMugs()),
    // fetchAllTags: () => dispatch(getAllTags())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
