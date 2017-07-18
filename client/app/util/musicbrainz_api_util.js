import NB from 'nodebrainz'
import {isEmpty, isNotEmpty} from './js_utils'

import Entity, {EntityType} from '../models/entities/entity'
import Recording from '../models/entities/recording'
import Release from '../models/entities/release'
import ReleaseGroup from '../models/entities/release_group'
import Artist from '../models/entities/artist'

const nb = new NB({userAgent:'wpirino-music-app/1.0.0 (https://wpirino-music-app.herokuapp.com/#/)'})

function getTypeQueryString(type) {
  switch (type) {
    case EntityType.RECORDING:
      return 'recording'
    case EntityType.RELEASE:
      return 'release'
    case EntityType.RELEASE_GROUP:
      return 'release-group'
    case EntityType.ARTIST:
      return 'artist'
    default:
      return ''
  }
}

function getTypeResponseField(type) {
  switch (type) {
    case EntityType.RECORDING:
      return 'recordings'
    case EntityType.RELEASE:
      return 'releases'
    case EntityType.RELEASE_GROUP:
      return 'release-groups'
    case EntityType.ARTIST:
      return 'artists'
    default:
      return ''
  }
}

const getQueryUrl = (entityTypeStr, queryStr) =>
    'https://musicbrainz.org/ws/2/' + entityTypeStr + '/?fmt=json&limit=10&query=' + queryStr

const getQueryByIdUrl = (entityTypeStr, id) =>
    'https://musicbrainz.org/ws/2/' + entityTypeStr + '/' + id + '?fmt=json'

const getQueryString = (query, field = '') => {
  if (field !== '') field += ':'
  const wordsQuery = query
      .trim()
      .split(' ')
      // Allow for fuzzy match or prefix match.
      .map((word) => {
        const fuzzyFactor = Math.max(2, Math.floor(word.length / 3))
        return '(' + field + '(' + word + '~' + fuzzyFactor + ')^4' + ' OR ' + field + word + '*)'
      })
      .join(' AND ')
  const finalQuery = '("' + query + '"^16 OR (' + wordsQuery + '))'
  console.log(finalQuery);
  return finalQuery
}

export function getEntities(entityType, {id, query, artistQuery}, onResponse) {
  if (isNotEmpty(id)) return getEntityById(entityType, id, onResponse)

  var entityTypeStr = getTypeQueryString(entityType)
  var queryStrings = []
  if (isNotEmpty(query)) {
    queryStrings.push(getQueryString(query))
  }
  if (isNotEmpty(artistQuery)) {
    queryStrings.push(getQueryString(artistQuery, 'artist'))
  }
  if (isEmpty(queryStrings)) {
    onResponse([])
    return
  }
  var queryUrl = getQueryUrl(entityTypeStr, queryStrings.join(' AND '))
  $.get(queryUrl, function(response) {
    var responseField = getTypeResponseField(entityType)
    var entities = response[responseField].map((pojo) => getEntity(entityType, pojo))
    var entityMap = {}
    entities.forEach((entity) => {
      entityMap[entity.id] = entity
    })
    onResponse(entityMap)
  })
}

function getEntityById(entityType, id, onResponse) {
  var entityTypeStr = getTypeQueryString(entityType)
  var queryUrl = getQueryByIdUrl(entityTypeStr, id)
  $.get(queryUrl, function(response) {
    var entity = getEntity(entityType, response)
    var entityMap = {}
    entityMap[entity.id] = entity
    onResponse(entityMap)
  })
}

function getEntity(entityType, pojo) {
  const releases = pojo.releases || []
  const firstRelease = releases.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))[0] || {}
  const artistCerdits = pojo['artist-credit'] || []
  const media = pojo.media || []
  switch(entityType) {
    case EntityType.RECORDING:
      return new Recording(
          pojo.id,
          entityType,
          pojo.title,
          pojo.score,
          pojo.length,
          artistCerdits.map((credit) => credit.artist.name),
          artistCerdits.map((credit) => credit.artist.id),
          releases.map((release) => release.title),
          releases.map((release) => release.id),
          firstRelease.date)
    case EntityType.RELEASE:
      return new Release(
          pojo.id,
          entityType,
          pojo.title,
          pojo.score,
          pojo.date,
          pojo.country,
          artistCerdits.map((credit) => credit.artist.name),
          artistCerdits.map((credit) => credit.artist.id),
          media.map((media) => media.format))
    case EntityType.RELEASE_GROUP:
      return new ReleaseGroup(
          pojo.id,
          entityType,
          pojo.title,
          pojo.score,
          releases.map((release) => release.title),
          releases.map((release) => release.id),
          artistCerdits.map((credit) => credit.artist.name),
          artistCerdits.map((credit) => credit.artist.id))
    case EntityType.ARTIST:
      return new Artist(pojo.id, entityType, pojo.name, pojo.score)
  }
}
