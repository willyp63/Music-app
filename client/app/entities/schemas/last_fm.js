import ENTITY_TYPE from '../type'

const LAST_FM_ENTITY_SCHEMA = {}

LAST_FM_ENTITY_SCHEMA[ENTITY_TYPE.TRACK] = {
  queryFieldName: 'track',
  searchResponseFieldName: 'trackmatches'
}

LAST_FM_ENTITY_SCHEMA[ENTITY_TYPE.ALBUM] = {
  queryFieldName: 'album',
  searchResponseFieldName: 'albummatches'
}

LAST_FM_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST] = {
  queryFieldName: 'artist',
  searchResponseFieldName: 'artistmatches'
}

export default LAST_FM_ENTITY_SCHEMA
