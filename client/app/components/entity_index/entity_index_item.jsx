import React from 'react'

import {isEmpty, isNotEmpty} from '../../util/js_utils'

function renderField(entity, field) {
  switch (field) {
    case 'artist':
      return 'Artist: ' + entity[field]
    default:
      return ''
  }
}

const EntityIndexItem = ({entity, onSongPlay}) => {
  if (isEmpty(entity)) return null
  const image = isNotEmpty(entity.image)
      ? (<img className="entity-index-item-image" src={entity.image[0]['#text']}/>)
      : ''
  const renderedFields = Object.keys(entity).map((field) => {
    const renderedField = renderField(entity, field)
    return isNotEmpty(renderedField)
        ? (<span key={field} className="entity-index-item-field">{renderedField}</span>)
        : ''
  })
  const playButton = isNotEmpty(entity.name) && isNotEmpty(entity.artist)
      ? (
        <button type="button" className="btn btn-primary entity-index-item-play-button" onClick={onSongPlay}>
          <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
        </button>
      ) : ''
  return (
    <div className="entity-index-item">
      {image}
      <div className="entity-index-item-name">
        {entity.name}
      </div>
      <div className="entity-index-item-fields">
        ({renderedFields})
      </div>
      {playButton}
    </div>
  )
}

export default EntityIndexItem
