import { isEmpty } from '../util/misc/empty'

import { RECEIVE_ENTITY } from '../actions/entity_actions'
import { REQUEST_YTID, RECEIVE_YTID, CLOSE_PLAYER } from '../actions/player_actions'

const playingTrack = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_YTID:
      // Create copy of track separate from [state.entities].
      return Object.assign({}, action.track)
    case RECEIVE_YTID:
      return Object.assign({}, state, {ytid: action.ytid})
    case RECEIVE_ENTITY:
      return action.entity.mbid === state.mbid
          ? Object.assign({}, state, action.entity)
          : state
    case CLOSE_PLAYER:
      return {}
    default:
      return state
  }
}

export default playingTrack
