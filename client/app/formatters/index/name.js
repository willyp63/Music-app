import React from 'react'

import { isEmpty, isNotEmpty } from '../../util/misc/empty'

export default function NameFormatter(name, {artist}) {
  if (isEmpty(name)) return ''
  const content = isNotEmpty(artist)
      ? name + ' - ' + artist
      : name
  return (
    <div className="entity-index-item-name">{content}</div>
  )
}
