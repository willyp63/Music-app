import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { isNotEmpty } from '../../util/misc/empty'
import { getUrlWithUrlAndParams, parseUrlParamsString } from '../../util/misc/string'
import ENTITY_TYPE from '../../util/api/last_fm/entity_type'
import { DEFAULT_PAGE_SIZE } from '../../util/api/last_fm/service'

import App from '../app'
import PaginationBar from './pagination_bar'
import ColumnHeaders from './column_headers'
import SearchResults from './search_results'
import { playTrack } from '../../actions/player_actions'

class SearchResultsContainerCompoent extends React.Component {
  prevPage() {
    if (this.props.page > 1) this.updatePage.bind(this, this.props.page - 1)()
  }
  nextPage() {
    if (this.props.page < this._totalPages()) {
      this.updatePage.bind(this, this.props.page + 1)()
    }
  }
  updatePage(page) {
    const urlParams = parseUrlParamsString(this.props.location.search)
    if (urlParams.pg === page) return
    urlParams.pg = page
    const newUrl = getUrlWithUrlAndParams(this.props.location.pathname, urlParams)
    this.props.history.push(newUrl)
  }
  _totalPages() {
    return Math.ceil(this.props.total / DEFAULT_PAGE_SIZE)
  }
  render() {
    return (
      <App>
        <div className="search-results-container">
          <div className="search-results-sticky-bar">
            <PaginationBar numResults={this.props.total}
                           pageNum={this.props.page}
                           numPages={this._totalPages()}
                           onPrevPage={this.prevPage.bind(this)}
                           onNextPage={this.nextPage.bind(this)}/>
            <ColumnHeaders type={this.props.type} />
          </div>
          <SearchResults results={this.props.results}
                         onTrackPlay={this.props.onTrackPlay} />
        </div>
      </App>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const page = parseInt(parseUrlParamsString(ownProps.location.search).pg)
  const type = parseInt(ownProps.match.params.type)
  return {
    results: state.searchResults.results,
    total: state.searchResults.total,
    page: isNaN(page) ? 1 : page,
    type: isNaN(type) ? ENTITY_TYPE.TRACK : type
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTrackPlay: (track) => dispatch(playTrack(track))
  }
}

const SearchResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsContainerCompoent)

export default withRouter(SearchResultsContainer)
