import ENTITY_TYPE from './entity_type'

/// Data schema for Last FM API util.
///
/// [queryFieldName]: The name of the field used for querying this type.
///
/// [searchResponseFieldName]: The name of the field in the response that
///     holds results for this type.
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
