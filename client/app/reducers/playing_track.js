import { isEmpty } from '../util/misc/empty'
import {
  REQUEST_YT_INFO,
  RECEIVE_YT_INFO,
  CLOSE_PLAYER } from '../actions/player_actions'

const playingTrack = (state = {}, action) => {
  switch (action.type) {
    case CLOSE_PLAYER:
      return {}
    case REQUEST_YT_INFO:
      return action.track
    case RECEIVE_YT_INFO:
      return Object.assign({}, state, action.ytInfo)
    default:
      return state
  }
}

export default playingTrack
