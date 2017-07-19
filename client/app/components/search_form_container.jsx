import React from 'react'
import {connect} from 'react-redux'

import debounce from 'lodash.debounce'

import {fetchEntities} from '../actions/entity_actions'
import {EntityType, entityTypeProperties} from '../util/entity_types'
import {getUrlWithQueryParams} from '../util/web_utils'

const QUERY_DEBOUNCE_TIME = 300
const QUERY_MAX_WAIT_TIME = 1000

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryType: EntityType.TRACK
    }
  }
  onQueryTypeChange () {
    const selectedType = parseInt($('#query-type-select option:selected').val())
    this.setState({queryType: selectedType})
    this.props.onQuery()
  }
  render() {
    const queryTypeOptions = Object.values(EntityType).map((type) => {
      const typeProperties = entityTypeProperties[type]
      return (
        <option value={type} key={type}>{typeProperties.label}</option>
      )
    })
    const placeholder = entityTypeProperties[this.state.queryType].placeHolderString
    const additionalInputs = this.state.queryType !== EntityType.ARTIST
        ? (
          <div className="form-group">
            <label>Artist</label>
            <input className="form-control"
                   id="artist-query-input"
                   type="text"
                   autoComplete="off"
                   onChange={this.props.onQuery} />
          </div>
        ) : ''
    return (
      <div className="container">
      	<div className="row">
      		<div className="col-md-12">
            <div className="input-group" id="adv-search">
              <input type="text"
                     className="form-control"
                     id="main-query-input"
                     autoComplete="off"
                     placeholder={placeholder}
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
                                  value={this.state.queryType}
                                  onChange={this.onQueryTypeChange.bind(this)}>
                            {queryTypeOptions}
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
        query: $('#main-query-input').val(),
        artistQuery: $('#artist-query-input').val(),
        queryType: parseInt($('#query-type-select option:selected').val())
      }))
    }, QUERY_DEBOUNCE_TIME, {'maxWait': QUERY_MAX_WAIT_TIME})
  }
}

const SearchFormContainer = connect(
  () => {return {}},
  mapDispatchToProps
)(SearchForm)

export default SearchFormContainer
