import ENTITY_TYPE from '../type'

import ImageFormatter from '../../formatters/show/image'
import NameFormatter from '../../formatters/show/name'
import PlayButtonFormatter from '../../formatters/show/play_button'

const SHOW_ENTITY_SCHEMA = {}

SHOW_ENTITY_SCHEMA[ENTITY_TYPE.TRACK] = {
  'album.image': {
    visible: true,
    formatter: ImageFormatter,
    order: 1
  },
  name: {
    visible: true,
    formatter: NameFormatter,
    order: 0
  },
  '#play_button': {
    visible: true,
    formatter: PlayButtonFormatter,
    order: 2
  }
}

SHOW_ENTITY_SCHEMA[ENTITY_TYPE.ALBUM] = {
  image: {
    visible: true,
    formatter: ImageFormatter,
    order: 1
  },
  name: {
    visible: true,
    formatter: NameFormatter,
    order: 0
  }
}

SHOW_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST] = {
  image: {
    visible: true,
    formatter: ImageFormatter,
    order: 1
  },
  name: {
    visible: true,
    formatter: NameFormatter,
    order: 0
  }
}

export default SHOW_ENTITY_SCHEMA
