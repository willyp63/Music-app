import ENTITY_TYPE from '../type'

import ImageFormatter from '../../formatters/index/image'
import NameFormatter from '../../formatters/index/name'
import PlayButtonFormatter from '../../formatters/index/play_button'

const INDEX_ENTITY_SCHEMA = {}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.TRACK] = {
  image: {
    visible: true,
    formatter: ImageFormatter,
    width: {
      md: 2,
      xs: 4
    },
    order: 0
  },
  name: {
    visible: true,
    formatter: NameFormatter,
    width: {
      md: 9,
      xs: 6
    },
    order: 1,
    dependentFields: ['artist']
  },
  play_button: {
    visible: true,
    formatter: PlayButtonFormatter,
    width: {
      md: 1,
      xs: 2
    },
    order: 2
  }
}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.ALBUM] = {
  image: {
    visible: true,
    formatter: ImageFormatter,
    width: {
      md: 2,
      xs: 4
    },
    order: 0
  },
  name: {
    visible: true,
    formatter: NameFormatter,
    width: {
      md: 10,
      xs: 8
    },
    order: 1,
    dependentFields: ['artist']
  }
}

INDEX_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST] = {
  image: {
    visible: true,
    formatter: ImageFormatter,
    width: {
      md: 2,
      xs: 4
    },
    order: 0
  },
  name: {
    visible: true,
    formatter: NameFormatter,
    width: {
      md: 10,
      xs: 8
    },
    order: 1
  }
}

export default INDEX_ENTITY_SCHEMA
