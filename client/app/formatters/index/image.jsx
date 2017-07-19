import React from 'react'

import { isEmpty, isNotEmpty } from '../../util/misc/empty'

export default function ImageFormatter(images) {
  if (isEmpty(images)) return ''
  const image = images[2] || images[1] || images[0]
  if (isEmpty(image['#text'])) return ''
  return (<img className="entity-index-item-image" src={image['#text']}/>)
}
