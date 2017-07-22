import React from 'react'
import { isEmpty } from '../../util/misc/empty'

const PaginationBar =
    ({numResults, pageNum, numPages, onPrevPage, onNextPage}) => {
  if (isEmpty(numResults) || numResults === 0) return null
  return (
    <div className="my-row search-results-pagination-bar">
      <div className="my-col-10 search-results-total-count">
        {numResults} results
      </div>
      <div className="my-col-10 search-results-page-number">
        Page: {pageNum} of {numPages}
      </div>
      <div className="my-col-4 search-results-page-buttons">
        <div className="input-group-btn">
          <div className="btn-group" role="group">
            <button type="button"
                    className="btn btn-primary"
                    onClick={onPrevPage}>
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            </button>
            <button type="button"
                    className="btn btn-primary"
                    onClick={onNextPage}>
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaginationBar
