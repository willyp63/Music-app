import React from 'react'

import { isEmpty, isNotEmpty } from '../../util/misc/empty'

export default function PlayButtonFormatter(field, dependentFields, props) {
  return (
    <button type="button" className="btn btn-primary entity-index-item-play-button" onClick={props.onTrackPlay}>
      <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
    </button>
  )
}
