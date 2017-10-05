import { RECEIVE_ENTITIES } from '../actions/search_actions'

const DEFAULT_STATE = Object.freeze({
  results: [],
  page: 1,
  total: 0
})

const searchResults = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return action.searchResults
    default:
      return state
  }
}

export default searchResults
