import React from 'react'

import { isNotEmpty } from '../../../util/misc/empty'

const EMPTY_RENDER_VALUE = '--'

const SearchResultPlainText = (text) => {
  return (
    <div className="search-result-plain-text">
      {isNotEmpty(text) ? text : EMPTY_RENDER_VALUE}
    </div>
  )
}

export default SearchResultPlainText
