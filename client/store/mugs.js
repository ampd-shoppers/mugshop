import Axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ALL_MUGS = 'SET_ALL_MUGS'

/**
 * INITIAL STATE
 */
const defaultMugs = []

/**
 * ACTION CREATORS
 */
const setAllMugs = mugs => ({type: SET_ALL_MUGS, mugs})

/**
 * THUNK CREATORS
 */
export const getAllMugs = () => async dispatch => {
  try {
    const response = await Axios.get('/api/mugs')
    const mugs = response.data
    dispatch(setAllMugs(mugs))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultMugs, action) {
  switch (action.type) {
    case SET_ALL_MUGS:
      return action.mugs
    default:
      return state
  }
}
