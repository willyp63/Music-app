import SearchResult from '../search/search_result'

export default class Artist extends SearchResult {
  constructor(id, type, name, score) {
    super(id, type, name, score)
  }
}
