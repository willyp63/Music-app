import React from 'react'

export default function SharedPlayButtonFormatter(callback, classNamePrefix) {
  return (
    <div className={classNamePrefix + '-play-button-container'}>
      <button type="button"
              className="btn btn-primary"
              onClick={callback}>
        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
      </button>
    </div>
  )
}
