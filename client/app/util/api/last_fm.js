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

const ARTIST_FIELD_NAME = LAST_FM_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST]

const MY_ID_PREFIX = 'myid#'
const MY_ID_POSSIBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const MY_ID_LENGTH = 16

function getNewId() {
  let idSuffix = ''
  for (let i = 0; i < MY_ID_LENGTH; i++){
    idSuffix += MY_ID_POSSIBLE_CHARS.charAt(Math.floor(Math.random() * MY_ID_POSSIBLE_CHARS.length))
  }
  return MY_ID_PREFIX + idSuffix
}

function makeQuery(queryType, entityType, query, additionalQueryParams) {
  return new Promise((resolve, reject) => {
    const queryParams = Object.assign({}, BASE_QUERY_PARAMS, additionalQueryParams)
    const queryFieldName = LAST_FM_ENTITY_SCHEMA[entityType].queryFieldName
    queryParams[queryFieldName] = query

    switch (queryType) {
      case QUERY_TYPE.SEARCH:
        queryParams.method = queryFieldName + '.search'
        break
      case QUERY_TYPE.GET_INFO:
        queryParams.method = queryFieldName + '.getInfo'
        break
      default:
        return {}
    }

    const queryUrl = getUrlWithQueryParams(BASE_URL, queryParams)
    $.get(queryUrl, (response) => {
      switch (queryType) {
        case QUERY_TYPE.SEARCH:
          const responseFieldName = LAST_FM_ENTITY_SCHEMA[entityType].searchResponseFieldName
          resolve(response.results[responseFieldName][queryFieldName])
          break
        case QUERY_TYPE.GET_INFO:
          resolve(response[queryFieldName])
      }
    }).fail((error) => {
      reject(error)
    })
  })
}

/*
  Searches Last FM for entities.

  Returns an object where each result is keyed to its mbid.

  [entityType]: *required*
      Entity type
  [query]: *required*
      Query string
  [artistQuery]: (optional)
      Optional query field, only available for tracks
*/
export function search({entityType, query, artistQuery}) {
  return new Promise((resolve, reject) => {
    if (isEmpty(entityType)) return reject('Must provide [entityType].')
    if (isEmpty(query)) return resolve([])

    const additionalQueryParams = {}
    if(entityType === ENTITY_TYPE.TRACK && isNotEmpty(artistQuery)) {
      additionalQueryParams[ARTIST_FIELD_NAME] = artistQuery
    }

    return makeQuery(QUERY_TYPE.SEARCH, entityType, query, additionalQueryParams).then((results) => {
      const mappedResults = {}
      results.forEach((result, i) => {
        result.order = i
        result.type = entityType
        result.mbid = result.mbid || getNewId()
        mappedResults[result.mbid] = result
      })
      resolve(mappedResults)
    })
  })
}

/*
  Fetches all the fields from Last FM for a single entity.

  Returns a single object with all of the entities fields.

  [entityType]: *required*
      Entity type
  [mbid]: (optional)
      Musicbrainz id
  [name]: *required* (Unless [mbid])
      Entity name
  [artist]: *required* (Unless [mbid])
      Entity artist name
*/
export function getInfo({entityType, mbid, name, artist}) {
  return new Promise((resolve, reject) => {
    if (isEmpty(entityType)) return reject('Must provide [entityType].')

    const additionalQueryParams = {}
    if (isEmpty(mbid) || isNotEmpty(mbid.match(/mbid#/))) {
      if (isEmpty(name) || isEmpty(artist)) return reject('Must provide ([name] and [artist]) or [mbid].')
      additionalQueryParams.artist = artist
    } else {
      additionalQueryParams.mbid = mbid
    }

    return makeQuery(QUERY_TYPE.GET_INFO, entityType, name, additionalQueryParams).then((result) => {
      resolve(Object.assign(result, {type: entityType, mbid}))
    })
  })
}
