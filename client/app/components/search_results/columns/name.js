import React from 'react'

import { isEmpty } from '../../../util/misc/empty'
import { FAKE_ID_PREFIX } from '../../../util/api/last_fm/service'

const SearchResultName = (name, {props}) => {
  return (
    <div className="search-result-name">
      {props.result.mbid.startsWith(FAKE_ID_PREFIX)
          ? name
          : (
            <span className="my-link" onClick={() => {
              props.history.push('/' + props.result.type + '/' + props.result.mbid)
            }}>{name}</span>
          )}
    </div>
  )
}

export default SearchResultName
