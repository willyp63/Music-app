import Playable from './playable'

export default class Release extends Playable {
  constructor(id, type, name, score, date, country, artistNames, artistIds, mediaFormats) {
    super(id, type, name, score)
    this.date = date
    this.country = country
    this.artistNames = artistNames
    this.artistIds = artistIds
    this.mediaFormats = mediaFormats
  }
}
