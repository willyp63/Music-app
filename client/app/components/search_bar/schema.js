import ENTITY_TYPE from '../../util/api/last_fm/entity_type'

/// Data schema for [SearchBar]
///
/// [label]: Label used for the entity type picker.
///
/// [placeHolder]: Placeholder for the text input.
const SEARCH_BAR_ENTITY_SCHEMA = {}

SEARCH_BAR_ENTITY_SCHEMA[ENTITY_TYPE.TRACK] = {
  label: 'Tracks',
  placeHolder: 'Search for tracks'
}

SEARCH_BAR_ENTITY_SCHEMA[ENTITY_TYPE.ALBUM] = {
  label: 'Albums',
  placeHolder: 'Search for albums'
}

SEARCH_BAR_ENTITY_SCHEMA[ENTITY_TYPE.ARTIST] = {
  label: 'Artists',
  placeHolder: 'Search for artists'
}

export default SEARCH_BAR_ENTITY_SCHEMA
