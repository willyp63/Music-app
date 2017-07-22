import React from 'react'
import { isEmpty, isNotEmpty } from '../../../util/misc/empty'

const SearchResultImage = (availableImages) => {
  if (isEmpty(availableImages)) return (<_EmptySearchResultImage />)

  let image
  for (let i = PREFERED_IMAGE_SIZE; i >= 0; i--) {
    image = availableImages[i]
    if (isNotEmpty(image)) break
  }

  if (isEmpty(image[SRC_FIELD_NAME])) return (<_EmptySearchResultImage />)
  return (
    <img className="search-result-image" src={image[SRC_FIELD_NAME]}/>
  )
}

/// Renders an empty image.
const _EmptySearchResultImage = () => (
  <img className="search-result-image" src={EMPTY_IMG_SRC}></img>
)

/// The larger the index the better the quality.
const PREFERED_IMAGE_SIZE = 2

/// Field where image url is located.
const SRC_FIELD_NAME = '#text'

/// An empty, black square used as a backup image source.
const EMPTY_IMG_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICA'
    + 'MAAACahl6sAAAABlBMVEX///8AAABVwtN+AAAA5ElEQVR4nO3PAQ0AMBADoZ9/07NBmsMB90'
    + 'bcuwlFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0S5ERH83EAx0VzRQTAAAAAE'
    + 'lFTkSuQmCC'

export default SearchResultImage
