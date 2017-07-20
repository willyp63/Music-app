import ENTITY_TYPE from '../type'

const SEARCH_ENTITY_SCHEMA = {}

SEARCH_ENTITY_SCHEMA[ENTITY_TYPE.TRACK] = {
  label: 'Tracks',
  placeHolderString: 'Search for tracks'
}

SEARCH_ENTITY_SCHEMA[ENTITY_TYPE.ALBUM] = {
  label: 'Albums',
  placeHolderString: 'Search for albums'
}

SEARCH_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST] = {
  label: 'Artists',
  placeHolderString: 'Search for artists'
}

export default SEARCH_ENTITY_SCHEMA
