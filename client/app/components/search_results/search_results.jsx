import React from 'react'

import { isEmpty } from '../../util/misc/empty'
import SearchResult from './search_result'
import SCHEMA from './schema'

const SearchResults = ({results, onTrackPlay}) => {
  if (isEmpty(results)) return (<div className="search-results"></div>)
  const searchResults = Object.values(results)
      .sort((a, b) => a.order - b.order)
      .map((result) => {
    return (
      <SearchResult key={result.mbid}
                    result={result}
                    onTrackPlay={() => onTrackPlay(result)} />
    )
  })
  return (
    <div className="search-results">{searchResults}</div>
  )
}

export default SearchResults
