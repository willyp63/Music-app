import {REQUEST_ENTITIES, RECEIVE_ENTITIES, RECEIVE_ENTITY_INFO} from '../actions/entity_actions'

const entities = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ENTITIES:
      return {}
    case RECEIVE_ENTITIES:
      return action.entities
    case RECEIVE_ENTITY_INFO:
      const mbid = action.entityInfo.mbid
      return Object.assign({}, state, {mbid: action.entityInfo})
    default:
      return state
  }
}

export default entities
