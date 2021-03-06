import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import debounce from 'lodash.debounce'
import { getUrlWithUpdatedParams, getUrlParams } from '../../util/misc/url'
import { isNotEmpty } from '../../util/misc/empty'
import ENTITY_TYPE from '../../util/api/last_fm/entity_type'

import { fetchEntities } from '../../actions/search_actions'
import SearchForm from './search_form'

class SearchBarContainerComponent extends React.Component {
  constructor(props) {
    super(props)
    if (isNotEmpty(props.query)) {
      props.onQuery(props.entityType, props.query, props.page)
    }
  }
  componentWillReceiveProps(newProps) {
    newProps.onQuery(newProps.entityType, newProps.query, newProps.page)
  }
  pushNewLocation(entityType, query) {
    const currentUrl = this.props.location.pathname + this.props.location.search
    const newUrl = getUrlWithUpdatedParams('/' + entityType, {q: query})
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
                          entityType={this.props.entityType}
                          onQuery={this.pushNewLocation.bind(this)}/>
            </div>
            <div className="col-md-2"></div>
          </div>
      	</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const entityType = ownProps.match.params.entityType
  const urlParams = getUrlParams(ownProps.location.search)
  const query = isNotEmpty(urlParams.q) ? decodeURIComponent(urlParams.q) : ''
  const page = isNotEmpty(urlParams.pg) ? parseInt(urlParams.pg) : 1
  return {
    entityType: isNotEmpty(entityType) ? parseInt(entityType) : ENTITY_TYPE.TRACK,
    query: query,
    page: page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQuery: debounce((entityType, query, page) => {
      dispatch(fetchEntities(entityType, query, page))
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
