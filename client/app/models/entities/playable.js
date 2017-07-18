import SearchResult from '../search/search_result'

export default class Playable extends SearchResult {
  constructor(id, type, name, score) {
    super(id, type)
    this.name = name
    this.score = score
  }
}
