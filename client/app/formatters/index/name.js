import React from 'react'

import { isEmpty, isNotEmpty } from '../../util/misc/empty'

export default function NameFormatter(name, additionalFields, props) {
  if (isEmpty(name)) return ''
  const artist = additionalFields['artist.name']
  const content = isNotEmpty(artist)
      ? name + ' - ' + artist
      : name
  return (
    <div className="entity-index-item-name"
         onClick={() => props.history.push(
             '/' + props.entity.type + '/' + props.entity.mbid)}>
      {content}
    </div>
  )
}
