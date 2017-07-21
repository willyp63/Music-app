import { getYtid } from '../util/api/youtube'
import { fetchEntity } from './entity_actions'
import ENTITY_TYPE from '../entities/type'

export function playTrack(track) {
  if (track.type !== ENTITY_TYPE.TRACK) {
    console.error('Tried playing an entity other than Track!!!')
    return
  }
  return function (dispatch) {
    dispatch(requestYtid(track))
    return getYtid(track.name, track.artist.name).then(({ytid, duration}) => {
      dispatch(receiveYtid(ytid, duration))
    })
  }
}

export const REQUEST_YTID = 'REQUEST_YTID'
function requestYtid(track) {
  return {type: REQUEST_YTID, track}
}

export const RECEIVE_YTID = 'RECEIVE_YTID'
function receiveYtid(ytid, duration) {
  return {type: RECEIVE_YTID, ytid, duration}
}

export const CLOSE_PLAYER = 'CLOSE_PLAYER'
export function closePlayer() {
  return {type: CLOSE_PLAYER}
}
