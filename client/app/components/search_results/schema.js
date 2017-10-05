import ENTITY_TYPE from '../../util/api/last_fm/entity_type'

import SearchResultImage from './columns/image'
import SearchResultName from './columns/name'
import SearchResultPlainText from './columns/plain_text'
import SearchResultPlayButton from './columns/play_button'

const INDEX_ENTITY_SCHEMA = {}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.TRACK] = {
  'artist.image': {
    visible: true,
    label: 'Artist image',
    component: SearchResultImage,
    width: 4,
    order: 0
  },
  name: {
    visible: true,
    label: 'Track name',
    component: SearchResultName,
    width: 7,
    order: 1
  },
  'artist.name': {
    visible: true,
    label: 'Artist name',
    component: SearchResultPlainText,
    width: 7,
    order: 2
  },
  'listeners': {
    visible: true,
    label: 'Popularity',
    component: SearchResultPlainText,
    width: 2,
    order: 3
  },
  '#play_button': {
    visible: true,
    component: SearchResultPlayButton,
    width: 4,
    order: 4
  }
}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.ALBUM] = {
  image: {
    visible: true,
    label: 'Album image',
    component: SearchResultImage,
    width: 4,
    order: 0
  },
  name: {
    visible: true,
    label: 'Album name',
    component: SearchResultName,
    width: 10,
    order: 1
  },
  'artist.name': {
    visible: true,
    label: 'Artist name',
    component: SearchResultPlainText,
    width: 10,
    order: 2
  },
}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST] = {
  image: {
    visible: true,
    label: 'Artist image',
    component: SearchResultImage,
    width: 4,
    order: 0
  },
  name: {
    visible: true,
    label: 'Artist name',
    component: SearchResultName,
    width: 20,
    order: 1
  }
}

export default INDEX_ENTITY_SCHEMA
