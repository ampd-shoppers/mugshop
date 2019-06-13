import Axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})

/**
 * THUNK CREATORS
 */
export const getCart = () => async dispatch => {
  try {
    const response = await Axios.get('/api/cart/user')
    const cart = response.data
    dispatch(setCart(cart))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
