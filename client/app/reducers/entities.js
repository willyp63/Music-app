import deepAssign from '../util/misc/deep_assign'

import { RECEIVE_ENTITIES, RECEIVE_ENTITY } from '../actions/entity_actions'

const entities = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return action.entities || {}
    case RECEIVE_ENTITY:
      const mbid = action.entity.mbid
      const newState = Object.assign({}, state)
      newState[mbid] = deepAssign(state[mbid], action.entity)
      return newState
    default:
      return state
  }
}

export default entities
