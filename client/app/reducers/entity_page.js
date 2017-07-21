import { RECEIVE_ENTITIES } from '../actions/entity_actions'

const entityTotal = (state = 0, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return action.page
    default:
      return state
  }
}

export default entityTotal
