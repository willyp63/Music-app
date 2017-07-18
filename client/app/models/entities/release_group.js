import SearchResult from '../search/search_result'

export default class ReleaseGroup extends SearchResult {
  constructor(id, type, name, score, releaseNames, releaseIds, artistNames, artistIds) {
    super(id, type, name, score)
    this.releaseNames = releaseNames
    this.releaseIds = releaseIds
    this.artistNames = artistNames
    this.artistIds = artistIds
  }
}
