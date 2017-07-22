import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import debounce from 'lodash.debounce'
import { getUrlWithUrlAndParams, parseUrlParamsString } from '../../util/misc/string'
import { isNotEmpty } from '../../util/misc/empty'
import ENTITY_TYPE from '../../util/api/last_fm/entity_type'

import { fetchEntities } from '../../actions/search_actions'
import SearchForm from './search_form'

class SearchBarContainerComponent extends React.Component {
  constructor(props) {
    super(props)
    if (isNotEmpty(props.query)) {
      props.onQuery(props.type, props.query, props.page)
    }
  }
  componentWillReceiveProps(newProps) {
    newProps.onQuery(newProps.type, newProps.query, newProps.page)
  }
  onTypeChange(newType) {
    this.pushNewLocation.bind(this, newType, this.props.query)()
  }
  onQueryChange(newQuery) {
    this.pushNewLocation.bind(this, this.props.type, newQuery)()
  }
  onQuery() {
    this.pushNewLocation.bind(this, this.props.type, this.props.query)()
  }
  pushNewLocation(type, query) {
    const currentUrl = this.props.location.pathname + this.props.location.search
    const newUrl = getUrlWithUrlAndParams('/' + type, {q: query})
    if (currentUrl !== newUrl) this.props.history.push(newUrl)
  }
  render() {
    return (
      <div className="search-bar">
        <div className="container">
        	<div className="row">
            <div className="col-md-2"></div>
        		<div className="col-md-8">
              <SearchForm query={this.props.query}
                          type={this.props.type}
                          onTypeChange={this.onTypeChange.bind(this)}
                          onQueryChange={this.onQueryChange.bind(this)}
                          onQuery={this.onQuery.bind(this)}/>
            </div>
            <div className="col-md-2"></div>
          </div>
      	</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const type = ownProps.match.params.type
  const urlParams = parseUrlParamsString(ownProps.location.search)
  const query = urlParams.q
  const page = urlParams.pg
  return {
    type: isNotEmpty(type) ? parseInt(type) : ENTITY_TYPE.TRACK,
    query: isNotEmpty(query) ? query : '',
    page: isNotEmpty(page) ? parseInt(page) : 1
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQuery: debounce((type, query, page) => {
      dispatch(fetchEntities(type, query, page))
    }, QUERY_DEBOUNCE_TIME, {'maxWait': QUERY_MAX_WAIT_TIME})
  }
}

const QUERY_DEBOUNCE_TIME = 300
const QUERY_MAX_WAIT_TIME = 1000

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarContainerComponent)

export default withRouter(SearchBarContainer)
