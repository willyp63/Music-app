export const EntityType = Object.freeze({
  TRACK: 0,
  ALBUM: 1,
  ARTIST: 2
})

export const entityTypeProperties = {
  0: {
    label: 'Track',
    placeHolderString: 'Search for tracks',
    lastFMqueryFieldName: 'track',
    lastFMresponseFieldName: 'trackmatches'
  },
  1: {
    label: 'Album',
    placeHolderString: 'Search for albums',
    lastFMqueryFieldName: 'album',
    lastFMresponseFieldName: 'albummatches'
  },
  2: {
    label: 'Artist',
    placeHolderString: 'Search for artists',
    lastFMqueryFieldName: 'artist',
    lastFMresponseFieldName: 'artistmatches'
  }
}
