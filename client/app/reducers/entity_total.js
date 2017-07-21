import { RECEIVE_ENTITIES } from '../actions/entity_actions'

const entityPage = (state = 0, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return action.total
    default:
      return state
  }
}

export default entityPage
