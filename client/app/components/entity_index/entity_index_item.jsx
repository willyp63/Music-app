import React from 'react'

import {isEmpty, isNotEmpty} from '../../util/js_utils'

const EntityIndexItem = ({entity, onSongPlay}) => {
  if (isEmpty(entity)) return null
  const image = isNotEmpty(entity.image)
      ? (<img className="entity-index-item-image" src={entity.image[1]['#text']}/>)
      : ''
  const renderedName = isNotEmpty(entity.artist)
      ? entity.artist + ' - ' + entity.name
      : entity.name
  const playButton = isNotEmpty(entity.name) && isNotEmpty(entity.artist)
      ? (
        <button type="button" className="btn btn-primary entity-index-item-play-button" onClick={onSongPlay}>
          <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
        </button>
      ) : ''
  return (
    <div className="container">
      <div className="row entity-index-item">
        <div className="col-md-2">
          {image}
        </div>
        <div className="col-md-4 entity-index-item-name">
          {renderedName}
        </div>
        <div className="col-md-2">
          {playButton}
        </div>
      </div>
    </div>
  )
}



export default EntityIndexItem
