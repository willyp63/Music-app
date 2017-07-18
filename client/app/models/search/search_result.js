import Entity from '../entities/entity'

export default class SearchResult extends Entity {
  constructor(id, type, name, score) {
    super(id, type)
    this.name = name
    this.score = score
  }
}
