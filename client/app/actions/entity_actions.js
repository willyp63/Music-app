import { search, getInfo } from '../util/api/last_fm'

export function fetchEntities({entityType, query, artistQuery}) {
  return function (dispatch) {
    dispatch(requestEntities())
    return search({entityType, query, artistQuery}).then((entities) => {
      dispatch(receiveEntities(entities))
    })
  }
}

export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
function requestEntities() {
  return {type: REQUEST_ENTITIES}
}

export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'
function receiveEntities(entities) {
  return {type: RECEIVE_ENTITIES, entities}
}

export function fetchEntityInfo({entityType, mbid, name, artist}) {
  return function (dispatch) {
    dispatch(requestEntityInfo(mbid))
    return getInfo({entityType, mbid, name, artist}).then((entityInfo) => {
      receiveEntityInfo(entityInfo)
    })
  }
}

export const REQUEST_ENTITY_INFO = 'REQUEST_ENTITY_INFO'
function requestEntityInfo(mbid) {
  return {type: REQUEST_ENTITY_INFO, mbid}
}

export const RECEIVE_ENTITY_INFO = 'RECEIVE_ENTITY_INFO'
function receiveEntityInfo(entityInfo) {
  return {type: RECEIVE_ENTITY_INFO, entityInfo}
}
