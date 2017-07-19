import {search, getInfo} from '../util/last_fm_api_util'

export function fetchEntities(queryParams) {
  return function (dispatch) {
    dispatch(requestEntities(queryParams))
    return search(queryParams, function (entities) {
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

export function fetchEntityInfo(queryParams) {
  return function (dispatch) {
    dispatch(requestEntityInfo(queryParams))
    return getInfo(queryParams, function (entities) {
      dispatch(receiveEntityInfo(entities))
    })
  }
}

export const REQUEST_ENTITY_INFO = 'REQUEST_ENTITY_INFO'
function requestEntityInfo(queryParams) {
  return {type: REQUEST_ENTITY_INFO, queryParams}
}

export const RECEIVE_ENTITY_INFO = 'RECEIVE_ENTITY_INFO'
function receiveEntityInfo(entityInfo) {
  return {type: RECEIVE_ENTITY_INFO, entityInfo}
}
