import React from 'react'
import { connect } from 'react-redux'

import debounce from 'lodash.debounce'
import { adjustScrollContainerHeightToFit } from '../util/dom/app'
import { getUrlWithQueryParams } from '../util/misc/string'

import { fetchEntities } from '../actions/entity_actions'
import ENTITY_TYPE from '../entities/type'
import SEARCH_ENTITY_SCHEMA from '../entities/schemas/search'

const QUERY_DEBOUNCE_TIME = 300
const QUERY_MAX_WAIT_TIME = 1000

function getSelectedEntityType() {
  return parseInt($('#query-type-select option:selected').val())
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entityType: ENTITY_TYPE.TRACK
    }
  }
  onQueryTypeChange () {
    this.setState({entityType: getSelectedEntityType()})
    this.props.onQuery()
  }
  render() {
    const entityTypeOptions = Object.values(ENTITY_TYPE).map((type) => {
      return (<option value={type} key={type}>{SEARCH_ENTITY_SCHEMA[type].label}</option>)
    })
    const placeholder = SEARCH_ENTITY_SCHEMA[this.state.entityType].placeHolderString
    const additionalInputs = this.state.entityType === ENTITY_TYPE.TRACK
        ? (
          <div className="form-group">
            <label>Artist</label>
            <input className="form-control"
                   id="artist-query-input"
                   type="text"
                   autoComplete="off"
                   onBlur={adjustScrollContainerHeightToFit}
                   onChange={this.props.onQuery} />
          </div>
        ) : ''
    return (
      <div className="container">
      	<div className="row">
          <div className="col-xs-2 col-md-2">
            <img src="http://www.clker.com/cliparts/M/B/X/W/R/H/headphones-md.png"
                 width="32"
                 height="32"/>
          </div>
      		<div className="col-xs-10 col-md-8">
            <div className="input-group" id="adv-search">
              <input type="text"
                     className="form-control"
                     id="main-query-input"
                     autoComplete="off"
                     placeholder={placeholder}
                     onBlur={adjustScrollContainerHeightToFit}
                     onChange={this.props.onQuery} />
              <div className="input-group-btn">
                <div className="btn-group" role="group">
                  <div className="dropdown dropdown-lg">
                    <button type="button"
                            className="btn btn-default dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="false">
                      <span className="caret"></span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" role="menu">
                      <form className="form-horizontal" role="form">
                        <div className="form-group">
                          <label>Search for</label>
                          <select className="form-control"
                                  id="query-type-select"
                                  value={this.state.entityType}
                                  onBlur={adjustScrollContainerHeightToFit}
                                  onChange={this.onQueryTypeChange.bind(this)}>
                            {entityTypeOptions}
                          </select>
                        </div>
                        {additionalInputs}
                      </form>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.props.onQuery}>
                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    	</div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQuery: debounce(() => {
      dispatch(fetchEntities({
        entityType: getSelectedEntityType(),
        query: $('#main-query-input').val(),
        artistQuery: $('#artist-query-input').val()
      }))
    }, QUERY_DEBOUNCE_TIME, {'maxWait': QUERY_MAX_WAIT_TIME})
  }
}

const SearchFormContainer = connect(
  () => {return {}},
  mapDispatchToProps
)(SearchForm)

export default SearchFormContainer
