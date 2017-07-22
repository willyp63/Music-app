import { getYtInfo } from '../util/api/youtube/service'
import ENTITY_TYPE from '../util/api/last_fm/entity_type'

/// Begins playing a track by fetching its info from Youtube.
export const playTrack = (track) => {
  // Make sure we are playing a track.
  if (track.type !== ENTITY_TYPE.TRACK) {
    console.error('Tried playing an entity other than Track!!!')
    return
  }

  return (dispatch) => {
    dispatch(_requestYtInfo(track))
    return getYtInfo(track.name, track.artist.name)
        .then((ytInfo) => {
      dispatch(_receiveYtInfo(ytInfo))
    })
  }
}

/// Closes the player by removing [playingTrack] from the store.
export function closePlayer() {
  return {type: CLOSE_PLAYER}
}
export const CLOSE_PLAYER = 'CLOSE_PLAYER'

function _requestYtInfo(track) {
  return {type: REQUEST_YT_INFO, track}
}
export const REQUEST_YT_INFO = 'REQUEST_YT_INFO'

function _receiveYtInfo(ytInfo) {
  return {type: RECEIVE_YT_INFO, ytInfo}
}
export const RECEIVE_YT_INFO = 'RECEIVE_YT_INFO'
