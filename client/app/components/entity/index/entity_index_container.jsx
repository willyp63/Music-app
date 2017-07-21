import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { isEmpty, isNotEmpty } from '../../../util/misc/empty'
import { getUrlWithQueryParams, parseQueryParamsString } from '../../../util/misc/string'

import App from '../../app'
import EntityIndexItem from './entity_index_item'
import { playTrack } from '../../../actions/player_actions'
import INDEX_ENTITY_SCHEMA from '../../../entities/schemas/index'
import { DEFAULT_PAGE_SIZE } from '../../search_bar_container'

function getColumnHeader(field, fieldProperties) {
  const columnClassName = isNotEmpty(fieldProperties.width)
      ? 'my-col-' + fieldProperties.width
      : ''
  return (
    <div key={field} className={columnClassName}>
      {isNotEmpty(fieldProperties.label) ? fieldProperties.label : ''}
    </div>
  )
}

class EntityIndex extends React.Component {
  nextPage() {
    if (this.props.page < this.totalPages()) {
      this.updatePage.bind(this, this.props.page + 1)()
    }
  }
  prevPage() {
    if (this.props.page > 1) this.updatePage.bind(this, this.props.page - 1)()
  }
  updatePage(page) {
    const urlParams = parseQueryParamsString(this.props.location.search)
    urlParams.pg = page
    const newUrl = getUrlWithQueryParams(this.props.location.pathname, urlParams)
    this.props.history.push(newUrl)
  }
  totalPages() {
    return Math.ceil(this.props.total / this.props.pageSize)
  }
  render() {
    if (isEmpty(this.props.entities)) {
      return (
        <App>
          <div className="entity-index"></div>
        </App>
      )
    }

    const columnHeaders = []
    const typeSchema = INDEX_ENTITY_SCHEMA[Object.values(this.props.entities)[0].type]
    Object.keys(typeSchema)
        .sort((a, b) => typeSchema[a].order - typeSchema[b].order)
        .forEach((field) => {
      const fieldProperties = typeSchema[field]
      if (fieldProperties.visible) {
        columnHeaders.push(getColumnHeader(field, fieldProperties))
      }
    })

    const orderedEntities = Object.values(this.props.entities).sort((a, b) => a.order - b.order)
    const rows = orderedEntities.map((entity) => {
      return (
        <EntityIndexItem key={entity.mbid}
                         entity={entity}
                         onTrackPlay={() => this.props.onTrackPlay(entity)}/>
      )
    })
    return (
      <App>
        <div className="entity-index">
          <div className="entity-index-top-bar">
            <div className="my-row entity-index-pagination-bar">
              <div className="my-col-12 entity-index-total-count">
                {this.props.total} results
              </div>
              <div className="my-col-8 entity-index-page-number">
                Page: {this.props.page} of {this.totalPages.bind(this)()}
              </div>
              <div className="my-col-4 entity-index-page-buttons">
                <div className="input-group-btn">
                  <div className="btn-group" role="group">
                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.prevPage.bind(this)}>
                      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    </button>
                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.nextPage.bind(this)}>
                      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-row entity-index-column-headers">
              {columnHeaders}
            </div>
          </div>
          <div className="entity-index">
            {rows}
          </div>
        </div>
      </App>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const urlParams = parseQueryParamsString(ownProps.location.search)
  const page = urlParams.pg
  const pageSize = urlParams.pgs
  return {
    entities: state.entities,
    total: state.entityTotal,
    page: isNotEmpty(page) ? parseInt(page) : 1,
    pageSize: isNotEmpty(pageSize) ? parseInt(pageSize) : DEFAULT_PAGE_SIZE
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTrackPlay: (entity) => dispatch(playTrack(entity))
  }
}

const EntityIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityIndex)

export default withRouter(EntityIndexContainer)
