import Axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ALL_TAGS = 'SET_ALL_TAGS'

/**
 * INITIAL STATE
 */
const defaultTags = []

/**
 * ACTION CREATORS
 */
const setAllTags = tags => ({type: SET_ALL_TAGS, tags})

/**
 * THUNK CREATORS
 */
export const getAllTags = () => async dispatch => {
  try {
    const response = await Axios.get('/api/tags')
    const tags = response.data
    dispatch(setAllTags(tags))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTags, action) {
  switch (action.type) {
    case SET_ALL_TAGS:
      return action.tags
    default:
      return state
  }
}
