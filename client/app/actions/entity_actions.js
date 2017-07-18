import {getEntities} from '../util/musicbrainz_api_util'

export function fetchEntities(entityType, queryParams) {
  return function (dispatch) {
    dispatch(requestEntities(entityType, queryParams))
    return getEntities(entityType, queryParams, function (entities) {
      dispatch(receiveEntities(entities))
    })
  }
}

export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
function requestEntities(entityType, queryParams) {
  return {type: REQUEST_ENTITIES, entityType, queryParams}
}

export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'
function receiveEntities(entities) {
  return {type: RECEIVE_ENTITIES, entities}
}

export const CLEAR_ENTITIES = 'CLEAR_ENTITIES'
export function clearEntities() {
  return {type: CLEAR_ENTITIES}
}
