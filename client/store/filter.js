export const VISIBILITY_FILTER = 'VISIBILITY_FILTER'
// const SHOW_ALL = 'SHOW_ALL'
export const setFilter = filter => {
  console.log(filter)
  return {
    type: VISIBILITY_FILTER,
    filter
  }
}

export default function(state = 'Show All', action) {
  switch (action.type) {
    case VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
