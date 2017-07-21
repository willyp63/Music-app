import { search, getInfo } from '../util/api/last_fm'

export function fetchEntities(entityType, query, page, pageSize) {
  return function (dispatch) {
    dispatch(requestEntities(entityType, query, page, pageSize))
    return search(entityType, query, page, pageSize).then((response) => {
      dispatch(receiveEntities(response.results, response.total, response.page))
    })
  }
}

export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
function requestEntities(entityType, query) {
  return {type: REQUEST_ENTITIES, entityType, query}
}

export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'
function receiveEntities(entities, total, page) {
  return {type: RECEIVE_ENTITIES, entities, total, page}
}

export function fetchEntity(entityType, mbid) {
  return function (dispatch) {
    dispatch(requestEntity(entityType, mbid))
    return getInfo(entityType, mbid).then((entity) => {
      dispatch(receiveEntity(entity))
    })
  }
}

export const REQUEST_ENTITY = 'REQUEST_ENTITY'
function requestEntity(entityType, mbid) {
  return {type: REQUEST_ENTITY, entityType, mbid}
}

export const RECEIVE_ENTITY = 'RECEIVE_ENTITY'
function receiveEntity(entity) {
  return {type: RECEIVE_ENTITY, entity}
}
