import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { isNotEmpty } from '../../util/misc/empty'
import { getUrlWithUpdatedParams, getUrlParams } from '../../util/misc/url'
import ENTITY_TYPE from '../../util/api/last_fm/entity_type'
import { DEFAULT_PAGE_SIZE } from '../../util/api/last_fm/service'

import AppContainer from '../app_container'
import PaginationBar from './pagination_bar'
import ColumnHeaders from './column_headers'
import SearchResults from './search_results'
import { playTrack } from '../../actions/player_actions'

class SearchResultsContainerCompoent extends React.Component {
  prevPage() {
    if (this.props.page > 1) {
      this.updatePage.bind(this, this.props.page - 1)()
    }
  }
  nextPage() {
    if (this.props.page < this._totalPages()) {
      this.updatePage.bind(this, this.props.page + 1)()
    }
  }
  updatePage(page) {
    if (this.props.page === page) return
    this.props.history.push(
      getUrlWithUpdatedParams(this.props.location.search, {pg: page}))
  }
  _totalPages() {
    return Math.ceil(this.props.total / DEFAULT_PAGE_SIZE)
  }
  render() {
    return (
      <AppContainer>
        <div className="container">
          <div className="row">
            <div className="search-results-container col-md-12">
              <div className="search-results-sticky-bar">
                <PaginationBar numResults={this.props.total}
                               pageNum={this.props.page}
                               numPages={this._totalPages()}
                               onPrevPage={this.prevPage.bind(this)}
                               onNextPage={this.nextPage.bind(this)}/>
                <ColumnHeaders entityType={this.props.entityType} />
              </div>
              <SearchResults results={this.props.results}
                             onTrackPlay={this.props.onTrackPlay} />
            </div>
          </div>
        </div>
      </AppContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const page = parseInt(getUrlParams(ownProps.location.search).pg)
  const entityType = parseInt(ownProps.match.params.entityType)
  return {
    results: state.searchResults.results,
    total: state.searchResults.total,
    page: isNaN(page) ? 1 : page,
    entityType: isNaN(entityType) ? ENTITY_TYPE.TRACK : entityType
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
