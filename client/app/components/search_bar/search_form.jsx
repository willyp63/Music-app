import React from 'react'
import ENTITY_TYPE from '../../util/api/last_fm/entity_type'
import SCHEMA from './schema'

const SearchForm = ({query, type, onQueryChange, onTypeChange}) => {
  const typeProperties = SCHEMA[type]
  const typeOptions = Object.values(ENTITY_TYPE).map((type) => {
    return (
      <div className="search-bar-type-option"
           key={type}
           onClick={() => onTypeChange(type)}>
        {SCHEMA[type].label}
      </div>
    )
  })
  return (
    <form className="input-group" id="adv-search" onSubmit={onQueryChange}>
      <input type="text"
             className="form-control"
             autoComplete="off"
             value={query}
             placeholder={typeProperties.placeHolder}
             onChange={(e) => onQueryChange(e.target.value)} />
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
          <button className="btn btn-primary" onClick={onQueryChange}>
            <span className="glyphicon glyphicon-search" aria-hidden="true">
            </span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm
