import Axios from 'axios'
import history from '../history'

export const SET_ALL_ORDERS = 'SET_ALL_ORDERS'

export const setAllOrders = orders => ({
  type: SET_ALL_ORDERS,
  orders
})
/**
 * INITIAL STATE
 */
const defaultOrders = []

export const getAllOrders = () => async dispatch => {
  try {
    const response = await Axios.get('/api/orders')
    const orders = response.data
    dispatch(setAllOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultOrders, action) {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return action.orders
    default:
      return state
  }
}
