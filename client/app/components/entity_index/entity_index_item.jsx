import React from 'react'

import {isEmpty, isNotEmpty} from '../../util/js_utils'
import {EntityType} from '../../util/entity_types'

const EntityIndexItem = ({entity, onSongPlay}) => {
  if (isEmpty(entity)) return null
  const image = isNotEmpty(entity.image)
      ? (<img className="entity-index-item-image" src={entity.image[1]['#text']}/>)
      : ''
  const renderedName = isNotEmpty(entity.artist)
      ? entity.artist + ' - ' + entity.name
      : entity.name
  const playButton = entity.type === EntityType.TRACK
      ? (
        <button type="button" className="btn btn-primary entity-index-item-play-button" onClick={onSongPlay}>
          <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
        </button>
      ) : ''
  return (
    <div className="row entity-index-item">
      <div className="col-xs-3 col-md-3">
        {image}
      </div>
      <div className="col-xs-6 col-md-6 entity-index-item-name">
        {renderedName}
      </div>
      <div className="col-xs-3 col-md-3">
        {playButton}
      </div>
    </div>
  )
}



export default EntityIndexItem
