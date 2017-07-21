import React from 'react'

import { isNotEmpty } from '../../util/misc/empty'

const EMPTY_RENDER_VALUE = '--'

export default function PlainTextFormatter(text) {
  return (
    <div className="entity-index-item-plain-text">
      {isNotEmpty(text) ? text : EMPTY_RENDER_VALUE}
    </div>
  )
}
