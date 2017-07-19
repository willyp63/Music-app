import ENTITY_TYPE from '../type'

const SEARCH_ENTITY_SCHEMA = {}

SEARCH_ENTITY_SCHEMA[ENTITY_TYPE.TRACK] = {
  label: 'Track',
  placeHolderString: 'Search for tracks'
}

SEARCH_ENTITY_SCHEMA[ENTITY_TYPE.ALBUM] = {
  label: 'Album',
  placeHolderString: 'Search for albums'
}

SEARCH_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST] = {
  label: 'Artist',
  placeHolderString: 'Search for artists'
}

export default SEARCH_ENTITY_SCHEMA
