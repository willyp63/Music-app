import { getUrlWithQueryParams } from '../misc/string'

import { isEmpty, isNotEmpty } from '../misc/empty'
import ENTITY_TYPE from '../../entities/type'
import LAST_FM_ENTITY_SCHEMA from '../../entities/schemas/last_fm'

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
const BASE_QUERY_PARAMS = {
  api_key: 'b384efbd0a1358eec2c055df63a186c0',
  format: 'json'
}

const QUERY_TYPE = Object.freeze({
  SEARCH: 0,
  GET_INFO: 1
})

function makeQuery(queryType, entityType, {mbid, query}) {
  return new Promise((resolve, reject) => {
    if (isEmpty(entityType)) return reject('Must provide [entityType].')

    const entityTypeProps = LAST_FM_ENTITY_SCHEMA[entityType]
    const queryFieldName = entityTypeProps.queryFieldName

    const queryParams = Object.assign({}, BASE_QUERY_PARAMS)
    switch (queryType) {
      case QUERY_TYPE.SEARCH:
        if (isEmpty(query)) return resolve([])
        queryParams[queryFieldName] = query
        queryParams.method = queryFieldName + '.search'
        break
      case QUERY_TYPE.GET_INFO:
        if (isEmpty(mbid)) return reject('Must provide [mbid].')
        queryParams.mbid = mbid
        queryParams.method = queryFieldName + '.getInfo'
        break
    }

    const queryUrl = getUrlWithQueryParams(BASE_URL, queryParams)
    $.get(queryUrl, (response) => {
      switch (queryType) {
        case QUERY_TYPE.SEARCH:
          const responseFieldName = entityTypeProps.searchResponseFieldName
          const results = response.results[responseFieldName][queryFieldName]
              // Disregard all entities without a mbid.
              .filter((result) => isNotEmpty(result.mbid))
              // Map search entity to look like getInfo entity.
              .map((result) => {
                if (entityType === ENTITY_TYPE.TRACK ||
                    entityType === ENTITY_TYPE.ALBUM) {
                  result = Object.assign(result, {artist: {name: result.artist}})
                }
                if (entityType === ENTITY_TYPE.TRACK) {
                  result = Object.assign(result, {album: {image: result.image}})
                }
                return result
              })
          const mappedResults = {}
          // Reverse b/c some results have the same mbid and we want the first one.
          results.reverse().forEach((result, i) => {
            mappedResults[result.mbid] =
                Object.assign(result, {order: results.length - i, type: entityType})
          })
          return resolve(mappedResults)
        case QUERY_TYPE.GET_INFO:
          return resolve(Object.assign(response[queryFieldName], {type: entityType}))
      }
    }).fail((error) => reject(error))
  })
}

export function search(entityType, query) {
  return makeQuery(QUERY_TYPE.SEARCH, entityType, {query})
}

export function getInfo(entityType, mbid) {
  return makeQuery(QUERY_TYPE.GET_INFO, entityType, {mbid})
}
