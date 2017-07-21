import ENTITY_TYPE from '../type'

import ImageFormatter from '../../formatters/index/image'
import NameFormatter from '../../formatters/index/name'
import PlayButtonFormatter from '../../formatters/index/play_button'
import PlainTextFormatter from '../../formatters/index/plain_text'

const INDEX_ENTITY_SCHEMA = {}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.TRACK] = {
  'artist.image': {
    visible: true,
    label: 'Artist image',
    formatter: ImageFormatter,
    width: 4,
    order: 0
  },
  name: {
    visible: true,
    label: 'Track name',
    formatter: NameFormatter,
    width: 7,
    order: 1
  },
  'artist.name': {
    visible: true,
    label: 'Artist name',
    formatter: PlainTextFormatter,
    width: 7,
    order: 2
  },
  'listeners': {
    visible: true,
    label: 'Listeners',
    formatter: PlainTextFormatter,
    width: 2,
    order: 3
  },
  '#play_button': {
    visible: true,
    formatter: PlayButtonFormatter,
    width: 4,
    order: 4
  }
}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.ALBUM] = {
  image: {
    visible: true,
    label: 'Album image',
    formatter: ImageFormatter,
    width: 4,
    order: 0
  },
  name: {
    visible: true,
    label: 'Album name',
    formatter: NameFormatter,
    width: 10,
    order: 1
  },
  'artist.name': {
    visible: true,
    label: 'Artist name',
    formatter: PlainTextFormatter,
    width: 10,
    order: 2
  },
}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST] = {
  image: {
    visible: true,
    label: 'Artist image',
    formatter: ImageFormatter,
    width: 4,
    order: 0
  },
  name: {
    visible: true,
    label: 'Artist name',
    formatter: NameFormatter,
    width: 20,
    order: 1
  }
}

export default INDEX_ENTITY_SCHEMA
