import React from 'react'

import { isEmpty, isNotEmpty } from '../../util/misc/empty'

const SRC_FIELD_NAME = '#text'

const EMPTY_IMG_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICA'
    + 'MAAACahl6sAAAABlBMVEX///8AAABVwtN+AAAA5ElEQVR4nO3PAQ0AMBADoZ9/07NBmsMB90'
    + 'bcuwlFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0S5ERH83EAx0VzRQTAAAAAE'
    + 'lFTkSuQmCC'

function getEmptyImage(classNamePrefix) {
  return (
    <img className={classNamePrefix + '-image'} src={EMPTY_IMG_SRC}></img>
  )
}

export default function SharedImageFormatter(
    availableImages, preferedSize, classNamePrefix) {
  if (isEmpty(availableImages)) return getEmptyImage(classNamePrefix)

  let image
  for (let i = preferedSize; i >= 0; i--) {
    image = availableImages[i]
    if (isNotEmpty(image)) break
  }

  if (isEmpty(image[SRC_FIELD_NAME])) return getEmptyImage(classNamePrefix)
  return (
    <img className={classNamePrefix + '-image'} src={image[SRC_FIELD_NAME]}/>
  )
}
