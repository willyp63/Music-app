import React from 'react'

const EXPECTED_CALLBACK_NAME = 'onTrackPlay'

const SearchResultPlayButton = (_, {props}) => {
  return (
    <div className="search-result-play-button">
      <button type="button"
              className="btn btn-primary"
              onClick={props[EXPECTED_CALLBACK_NAME]}>
        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
      </button>
    </div>
  )
}

export default SearchResultPlayButton
