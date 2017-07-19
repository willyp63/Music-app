import { RECEIVE_ENTITY_INFO } from '../actions/entity_actions'
import { REQUEST_YTID, RECEIVE_YTID } from '../actions/player_actions'

const playingTrack = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_YTID:
      return action.track
    case RECEIVE_YTID:
      return Object.assign({}, state, {ytid: action.ytid})
    case RECEIVE_ENTITY_INFO:
      return Object.assign({}, state, action.entityInfo)
    default:
      return state
  }
}

export default playingTrack
