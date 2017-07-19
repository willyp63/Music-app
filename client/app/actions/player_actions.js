import { getYtid } from '../util/api/youtube'
import { fetchEntityInfo } from './entity_actions'
import ENTITY_TYPE from '../entities/type'

export function playTrack(track) {
  if (track.type !== ENTITY_TYPE.TRACK) {
    console.error('Tried playing an entity other than Track!!!')
    return
  }
  return function (dispatch) {
    dispatch(requestYtid(track))
    dispatch(fetchEntityInfo({
      entityType: ENTITY_TYPE.TRACK,
      mbid: track.mbid,
      name: track.name,
      artist: track.artist}))
    return getYtid({name: track.name, artist: track.artist}).then((ytid) => {
      dispatch(receiveYtid(ytid))
    })
  }
}

export const REQUEST_YTID = 'REQUEST_YTID'
function requestYtid(track) {
  return {type: REQUEST_YTID, track}
}

export const RECEIVE_YTID = 'RECEIVE_YTID'
function receiveYtid(ytid) {
  return {type: RECEIVE_YTID, ytid}
}
