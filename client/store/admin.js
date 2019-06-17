import Axios from 'axios'
import history from '../history'

const initialState = {
  orders: [],
  users: [],
  products: []
}

export const SET_ADMIN_ORDERS = 'SET_ADMIN_ORDERS'

export const setAllOrders = orders => ({
  type: SET_ADMIN_ORDERS,
  orders
})

export const adminAllOrders = () => async dispatch => {
  try {
    let response = await Axios.get('api/orders/all')
    let allOrders = response.data
    dispatch(setAllOrders(allOrders))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN_ORDERS:
      return {
        ...state,
        orders: action.orders
      }

    default:
      return state
  }
}
