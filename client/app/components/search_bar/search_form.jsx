import React from 'react'
import ENTITY_TYPE from '../../util/api/last_fm/entity_type'
import SCHEMA from './schema'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {entityType: props.entityType, query: props.query}
  }
  onEntityTypeChange(newEntityType) {
    this.setState((prevState) =>
      Object.assign(prevState, {entityType: newEntityType}))
  }
  onQueryChange(newQuery) {
    this.setState((prevState) => Object.assign(prevState, {query: newQuery}))
  }
  onQuery(event) {
    event.preventDefault()
    this.props.onQuery(this.state.entityType, this.state.query)
  }
  render() {
    const typeProperties = SCHEMA[this.state.entityType]
    const typeOptions = Object.values(ENTITY_TYPE).map((type) => {
      return (
        <div className="search-bar-type-option"
             key={type}
             onClick={this.onEntityTypeChange.bind(this, type)}>
          {SCHEMA[type].label}
        </div>
      )
    })
    return (
      <div className="input-group">
        <form onSubmit={(e) => this.onQuery.bind(this, e)()}>
          <input type="text"
                 className="form-control"
                 autoComplete="off"
                 value={this.state.query}
                 placeholder={typeProperties.placeHolder}
                 onChange={(e) => this.onQueryChange.bind(this, e.target.value)()} />
        </form>
        <div className="input-group-btn">
          <div className="btn-group" role="group">
            <div className="dropdown dropdown-lg">
              <button className="btn btn-default dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false">
                {typeProperties.label}
                <span className="caret serach-bar-type-picker-caret"></span>
              </button>
              <div className="dropdown-menu dropdown-menu-right" role="menu">
                {typeOptions}
              </div>
            </div>
            <button className="btn btn-primary" onClick={this.onQuery.bind(this)}>
              <span className="glyphicon glyphicon-search" aria-hidden="true">
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchForm
