import React from 'react'

import SharedImageFormatter from '../shared/image'

export default function ImageFormatter(availableImages) {
  return SharedImageFormatter(availableImages, 3, 'entity-show')
}
