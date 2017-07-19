import {getEntities} from '../util/last_fm_api_util'

export function fetchEntities(queryParams) {
  return function (dispatch) {
    dispatch(requestEntities(queryParams))
    return getEntities(queryParams, function (entities) {
      dispatch(receiveEntities(entities))
    })
  }
}

export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
function requestEntities(queryParams) {
  return {type: REQUEST_ENTITIES, queryParams}
}

export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'
function receiveEntities(entities) {
  return {type: RECEIVE_ENTITIES, entities}
}
