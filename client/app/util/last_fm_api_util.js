import {getUrlWithQueryParams} from './web_utils'

import {isEmpty, isNotEmpty} from './js_utils'
import {EntityType, entityTypeProperties} from './entity_types'

const baseUrl = 'https://ws.audioscrobbler.com/2.0/'
const defaultQueryParams = {
  api_key: 'b384efbd0a1358eec2c055df63a186c0',
  format: 'json'
}

function makeid(length) {
  let id = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++){
    id += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return 'mbid#' + id
}

export function search({queryType, query, artistQuery}, onResponse) {
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
    const mappedResults = {}
    results.forEach((result, i) => {
      result.order = i
      result.type = queryType
      result.mbid = result.mbid || makeid(16)
      mappedResults[result.mbid] = result
    })
    onResponse(mappedResults)
  })
}

export function getInfo({type, mbid, name, artist}, onResponse) {
  if (isEmpty(type)) return onResponse({})

  const queryParams = Object.assign({}, defaultQueryParams)
  const queryFieldName = entityTypeProperties[type].lastFMqueryFieldName
  queryParams.method = queryFieldName + '.getInfo'

  if (isEmpty(mbid) || mbid.match(/mbid#/) !== null) {
    if (isEmpty(name) || isEmpty(artist)) return onResponse({})
    queryParams[queryFieldName] = name
    queryParams.artist = artist
  } else {
    queryParams.mbid = mbid
  }

  var queryUrl = getUrlWithQueryParams(baseUrl, queryParams)
  $.get(queryUrl, function(response) {
    const updateEntity = Object.assign(response[queryFieldName], {type, mbid, name, artist})
    onResponse(updateEntity)
  })
}
