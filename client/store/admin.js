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

export const UPDATE_ORDER_PROGRESS = 'UPDATE_ORDER_PROGRESS'

export const updateOrderProgress = updatedOrder => ({
  type: UPDATE_ORDER_PROGRESS,
  updatedOrder
})
export const updateOrder = (orderId, progress) => async dispatch => {
  try {
    let res = await Axios.put(`/api/orders/${orderId}`, {progress})
    let updatedOrder = res.data[1][0]
    console.log(updatedOrder)
    dispatch(updateOrderProgress(updatedOrder))
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
    case UPDATE_ORDER_PROGRESS:
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id === action.updatedOrder.id) {
            return action.updatedOrder
          } else {
            return order
          }
        })
      }
    default:
      return state
  }
}
