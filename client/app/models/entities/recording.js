import Playable from './playable'

export default class Recording extends Playable {
  constructor(id, type, name, score, length, artistNames, artistIds, releaseNames, releaseIds, firstReleaseDate) {
    super(id, type, name, score)
    this.length = length
    this.artistNames = artistNames
    this.artistIds = artistIds
    this.releaseNames = releaseNames
    this.releaseIds = releaseIds
    this.firstReleaseDate = firstReleaseDate
  }
}
