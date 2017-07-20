import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import debounce from 'lodash.debounce'
import { adjustScrollContainerHeightToFit } from '../util/dom/app'
import { getUrlWithQueryParams, parseQueryParamsString } from '../util/misc/string'
import { isNotEmpty } from '../util/misc/empty'

import { fetchEntities } from '../actions/entity_actions'
import ENTITY_TYPE from '../entities/type'
import SEARCH_ENTITY_SCHEMA from '../entities/schemas/search'

const QUERY_DEBOUNCE_TIME = 300
const QUERY_MAX_WAIT_TIME = 1000

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.query,
      entityType: props.entityType
    }
    if (isNotEmpty(props.query)) {
      this.props.onQuery(props.entityType, props.query)
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      query: newProps.query,
      entityType: newProps.entityType
    })
    this.props.onQuery(newProps.entityType, newProps.query)
  }
  onQuery() {
    this.props.history.push(getUrlWithQueryParams(
        '/' + this.state.entityType, {q: this.state.query}))
    this.props.onQuery(this.state.entityType, this.state.query)
  }
  render() {
    const selectedTypeProps = SEARCH_ENTITY_SCHEMA[this.state.entityType]
    const placeholder = selectedTypeProps.placeHolderString
    const typePickerLabel = selectedTypeProps.label
    const entityTypeOptions = Object.values(ENTITY_TYPE).map((type) => {
      return (
        <div key={type}
             className="search-bar-type-option"
             onClick={() => {
               this.setState({entityType: type}, this.onQuery.bind(this))
             }}>
          {SEARCH_ENTITY_SCHEMA[type].label}
        </div>
      )
    })
    return (
      <div className="container">
      	<div className="row">
          <div className="col-xs-2 col-md-2 search-bar-home-link"
               onClick={() => this.props.history.push('/0')}>
            <img src="http://www.clker.com/cliparts/M/B/X/W/R/H/headphones-md.png"
                 width="32"
                 height="32" />
          </div>
      		<div className="col-xs-10 col-md-8">
            <form className="input-group"
                  id="adv-search"
                  onSubmit={this.onQuery.bind(this)}>
              <input type="text"
                     className="form-control"
                     id="main-query-input"
                     autoComplete="off"
                     value={this.state.query}
                     placeholder={placeholder}
                     onBlur={adjustScrollContainerHeightToFit}
                     onChange={(e) => {
                       this.setState({query: e.target.value}, this.onQuery.bind(this))
                     }} />
              <div className="input-group-btn">
                <div className="btn-group" role="group">
                  <div className="dropdown dropdown-lg">
                    <button type="button"
                            className="btn btn-default dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="false">
                      {typePickerLabel}
                      <span className="caret serach-bar-type-picker-caret"></span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" role="menu">
                      {entityTypeOptions}
                    </div>
                  </div>
                  <button type="button"
                          className="btn btn-primary"
                          onClick={this.onQuery.bind(this)}>
                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
    	</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const query = parseQueryParamsString(ownProps.location.search).q
  const entityType = ownProps.match.params.entityType
  return {
    query: isNotEmpty(query) ? query : '',
    entityType: isNotEmpty(entityType) ? parseInt(entityType) : ENTITY_TYPE.TRACK
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQuery: debounce((entityType, query) => {
      dispatch(fetchEntities(entityType, query))
    }, QUERY_DEBOUNCE_TIME, {'maxWait': QUERY_MAX_WAIT_TIME})
  }
}

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)

export default withRouter(SearchBarContainer)
