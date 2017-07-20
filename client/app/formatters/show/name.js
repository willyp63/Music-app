import React from 'react'

import { isEmpty } from '../../util/misc/empty'

export default function NameFormatter(name) {
  if (isEmpty(name)) return ''
  return (
    <div className="entity-show-name">{name}</div>
  )
}
