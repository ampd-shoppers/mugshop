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

export const SET_ALL_USERS = 'SET_ALL_USERS'

export const setAllUsers = users => ({
  type: SET_ALL_USERS,
  users
})

export const adminAllUsers = () => async dispatch => {
  try {
    let response = await Axios.get('api/users/all')
    let allUsers = response.data
    dispatch(setAllUsers(allUsers))
  } catch (err) {
    console.error(err)
  }
}

export const UPDATE_USER_LEVEL = 'UPDATE_USER_LEVEL'

export const updateUserLevel = updatedOrder => ({
  type: UPDATE_USER_LEVEL,
  updatedOrder
})
export const updateUser = (userId, permissionLevel) => async dispatch => {
  try {
    let res = await Axios.put(`/api/users/${userId}`, {permissionLevel})
    let updatedUser = res.data[1][0]
    console.log(updatedUser)
    // dispatch(updateOrderProgress(updatedOrder))
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
    case SET_ALL_USERS:
      return {
        ...state,
        users: action.users
      }
    default:
      return state
  }
}
