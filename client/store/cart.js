import Axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
export const DELETE_MUG_CART = 'DELETE_MUG_CART'
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
export const ADD_MUG = 'ADD_MUG'
export const CLEAR_CART = 'CLEAR_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})

export const deleteMugCart = mugId => ({
  type: DELETE_MUG_CART,
  mugId
})

export const updateMugQuantity = updatedMug => ({
  type: UPDATE_QUANTITY,
  updatedMug
})

export const addMugToCart = mug => ({
  type: ADD_MUG,
  mug
})

export const clearCart = () => ({
  type: CLEAR_CART
})
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

export const removeCartItem = id => async dispatch => {
  try {
    await Axios.delete(`/api/cart/user/${id}`)
    dispatch(deleteMugCart(id))
  } catch (err) {
    console.error(err)
  }
}

export const updateMug = (mugId, qty) => async dispatch => {
  try {
    const response = await Axios.put(`/api/cart/${mugId}`, {qty})
    const updatedMug = response.data
    dispatch(updateMugQuantity(updatedMug))
  } catch (err) {
    console.error(err)
  }
}

export const addNewMug = id => async dispatch => {
  try {
    let response = await Axios.post('/api/cart/', {
      mugId: id,
      qty: 1
    })
    console.log('response from store cart addNewMug', response.data)
    if (response.data !== 'Already In Cart') {
      dispatch(addMugToCart(response.data))
    }
    return response.data
  } catch (err) {
    console.error(err)
  }
}

export const checkoutCart = () => async dispatch => {
  try {
    let response = await Axios.get('api/cart/user/checkout')
    console.log(response.data)
    if (typeof response.data !== 'string') {
      dispatch(clearCart())
    }
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
    case DELETE_MUG_CART:
      return state.filter(mug => mug.mugId !== action.mugId)
    case UPDATE_QUANTITY:
      return state.map(mug => {
        if (mug.mugId === action.updatedMug.mugId) {
          return action.updatedMug
        } else {
          return mug
        }
      })
    case ADD_MUG:
      return state.concat(action.mug)
    case CLEAR_CART:
      return defaultCart
    default:
      return state
  }
}
