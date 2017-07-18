import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import debounce from 'lodash.debounce'
import {isNotEmpty} from '../../util/js_utils'
import {parseUrlQueryString} from '../../util/web_utils'

import EntityTypePicker from './entity_type_picker'
import {fetchEntities, clearEntities} from '../../actions/entity_actions'
import {changeSearchType} from '../../actions/search_actions'
import {EntityType} from '../../models/entities/entity'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = debounce(() => {
      const query = $('#main-query-input').val()
      const artistQuery = $('#artist-query-input').val()
      // ParseInt b/c we want entity type enum value (ie. an int)
      const entityType = parseInt($('input[name=entity-type]:checked').val())
      let newRoute = '/' + entityType
      if (isNotEmpty(query)) newRoute += '?q=' + query
      if (isNotEmpty(artistQuery)) newRoute += '&aq=' + artistQuery
      this.props.history.push(newRoute)
      this.props.onChange(entityType, query, artistQuery)
    }, 300, {'maxWait': 1000})
  }
  componentDidMount () {
    $('#main-query-input').val(this.props.query)
    $('#artist-query-input').val(this.props.artistQuery)
    $('input[name=entity-type][value=' + this.props.entityType + ']').prop('checked', true)
    this.props.onChange(this.props.entityType, this.props.query, this.props.artistQuery)
  }
  render() {
    const boundOnChange = this.onChange.bind(this)
    return (
      <div id="search-bar">
        <EntityTypePicker selectedType={this.props.entityType} onChange={boundOnChange}/>
        <div className="search-bar-main-input">
          <input id="main-query-input" type="text" onChange={boundOnChange}/>
        </div>
        {this.props.entityType !== EntityType.ARTIST
          ? (<div className="search-bar-secondary-input">
              <label>Artist:</label>
              <input id="artist-query-input" type="text" onChange={boundOnChange}/>
             </div>)
          : ''}
        <button onClick={boundOnChange} className="btn btn-primary search-bar-refresh-button">↻</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const queryParms = parseUrlQueryString(ownProps.location.search)
  return {
    entityType: parseInt(ownProps.match.params.entityType) || EntityType.RECORDING,
    query: queryParms.q || '',
    artistQuery: queryParms.aq || ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (entityType, query, artistQuery) => {
      dispatch(clearEntities())
      dispatch(fetchEntities(entityType, {query, artistQuery}))
    }
  }
}

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)

export default withRouter(SearchBarContainer)
