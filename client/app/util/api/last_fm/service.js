import { isEmpty, isNotEmpty } from '../../misc/empty'
import { getUrlWithUrlAndParams } from '../../misc/string'

import SCHEMA from './schema'
import ENTITY_TYPE from './entity_type'

import { LAST_FM_API_KEY } from '../../../secrets/keys'

export const DEFAULT_PAGE_SIZE = 30

/// Base url and url params for making all requests.
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
const BASE_URL_PARAMS = {
  api_key: LAST_FM_API_KEY,
  format: 'json'
}

/// Supported Last FM query types.
///
/// See (http://www.last.fm/api).
const QUERY_TYPE = Object.freeze({
  SEARCH: 0,
  GET_INFO: 1
})

/// Preforms a search query.
///
/// Returns a list a search results.
export const search = (entityType, query, page, pageSize) => {
  return makeQuery(QUERY_TYPE.SEARCH, entityType, {query, page, pageSize})
}

/// Preforms a getInfo query, which returns more fields than a search query.
///
/// Returns a single object with the entities info.
export const getInfo = (entityType, mbid) => {
  return makeQuery(QUERY_TYPE.GET_INFO, entityType, {mbid})
}

/// Preforms a Last FM query with the given params.
///
/// Will resolve to different value types base on [queryType].
///
/* TODO: Refactor and better document. */
const makeQuery = (queryType, entityType, {mbid, query, page, pageSize}) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(entityType)) return reject('Must provide [entityType].')

    const entityTypeProps = SCHEMA[entityType]
    const queryFieldName = entityTypeProps.queryFieldName

    const queryParams = Object.assign({}, BASE_URL_PARAMS)
    switch (queryType) {
      case QUERY_TYPE.SEARCH:
        if (isEmpty(query)) return resolve([])
        queryParams[queryFieldName] = query
        queryParams.method = queryFieldName + '.search'
        if (isNotEmpty(page)) queryParams.page = page
        if (isNotEmpty(pageSize)) queryParams.limit = pageSize
        break
      case QUERY_TYPE.GET_INFO:
        if (isEmpty(mbid)) return reject('Must provide [mbid].')
        queryParams.mbid = mbid
        queryParams.method = queryFieldName + '.getInfo'
        break
    }

    const queryUrl = getUrlWithUrlAndParams(BASE_URL, queryParams)
    $.get(queryUrl, (response) => {
      switch (queryType) {
        case QUERY_TYPE.SEARCH:
          const responseFieldName = entityTypeProps.searchResponseFieldName
          const results = response.results[responseFieldName][queryFieldName]
              // Map search entity to look like getInfo entity.
              .map((result) => {
                result.mbid = result.mbid || makeFakeId()
                if (entityType === ENTITY_TYPE.TRACK ||
                    entityType === ENTITY_TYPE.ALBUM) {
                  result.artist = {name: result.artist}
                }
                if (entityType === ENTITY_TYPE.TRACK) {
                  result.artist.image = result.image
                }
                return result
              })
          const mappedResults = {}
          // Reverse b/c some results have the same mbid and we want the first one.
          results.reverse().forEach((result, i) => {
            mappedResults[result.mbid] =
                Object.assign(result, {order: results.length - i, type: entityType})
          })
          return resolve({
            results: mappedResults,
            total: response.results['opensearch:totalResults'],
            page: response.results['opensearch:startIndex'] /
                response.results['opensearch:itemsPerPage'] + 1
          })
        case QUERY_TYPE.GET_INFO:
          return resolve(Object.assign(response[queryFieldName], {type: entityType}))
      }
    }).fail((error) => reject(error))
  })
}

/// Consts used for creating fake ids.
export const FAKE_ID_PREFIX = 'FAKE_ID_'
const FAKE_ID_LENGTH = 16
const FAKE_ID_POSSIBLE_CHARS =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'

/// Returns a rendomly generated fake id of the form 'FAKE_ID_123abc....'.
const makeFakeId = () => {
  let id = ''
  for (let i = 0; i < FAKE_ID_LENGTH; i++) {
    const j = Math.floor(Math.random() * FAKE_ID_POSSIBLE_CHARS.length)
    id += FAKE_ID_POSSIBLE_CHARS[j]
  }
  return FAKE_ID_PREFIX + id
}
