import { search, getInfo } from '../util/api/last_fm/service'

/// Fetches entities from Last FM with the given search params.
export const fetchEntities = (entityType, query, page) => {
  return (dispatch) => {
    return search(entityType, query, page)
        .then((searchResults) => {
      dispatch(_receiveEntities(searchResults))
    })
  }
}

const _receiveEntities = (searchResults) => {
  return {type: RECEIVE_ENTITIES, searchResults}
}
export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'
