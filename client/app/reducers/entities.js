import { RECEIVE_ENTITIES, RECEIVE_ENTITY } from '../actions/entity_actions'

const entities = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return action.entities
    case RECEIVE_ENTITY:
      const mbid = action.entity.mbid
      const newEntity = Object.assign({}, state[mbid] || {}, action.entity)
      const newState = Object.assign({}, state)
      newState[mbid] = newEntity
      return newState
    default:
      return state
  }
}

export default entities
