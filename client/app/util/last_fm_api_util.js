import {getUrlWithQueryParams} from './web_utils'

import {isEmpty, isNotEmpty} from './js_utils'
import {EntityType, entityTypeProperties} from './entity_types'

const baseUrl = 'https://ws.audioscrobbler.com/2.0/'
const defaultQueryParams = {
  api_key: 'b384efbd0a1358eec2c055df63a186c0',
  format: 'json'
}

export function getEntities({queryType, query, artistQuery}, onResponse) {
  if (isEmpty(queryType) || isEmpty(query)) return onResponse([])

  const queryParams = Object.assign({}, defaultQueryParams)
  const queryFieldName = entityTypeProperties[queryType].lastFMqueryFieldName
  queryParams.method = queryFieldName + '.search'
  queryParams[queryFieldName] = query
  if (isNotEmpty(artistQuery)) {
    const artistFieldName = entityTypeProperties[EntityType.ARTIST].lastFMqueryFieldName
    queryParams[artistFieldName] = artistQuery
  }

  var queryUrl = getUrlWithQueryParams(baseUrl, queryParams)
  $.get(queryUrl, function(response) {
    const responseFieldName = entityTypeProperties[queryType].lastFMresponseFieldName
    const results = response.results[responseFieldName][queryFieldName]
    results.forEach((result) => {
      result.type = queryType
    })
    onResponse(results)
  })
}
