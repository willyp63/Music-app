import React from 'react'

import { isNotEmpty } from '../../util/misc/empty'

const EMPTY_RENDER_VALUE = '--'

export default function NameFormatter(name) {
  return (
    <div className="entity-show-name">
      {isNotEmpty(name) ? name : EMPTY_RENDER_VALUE}
    </div>
  )
}
