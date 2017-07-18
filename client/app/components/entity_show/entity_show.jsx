import React from 'react'
import {withRouter} from 'react-router-dom'

import Playable from '../../models/entities/playable'
import Release from '../../models/entities/release'
import ReleaseGroup from '../../models/entities/release_group'
import Artist from '../../models/entities/artist'
import {formatTime} from '../../formatters/time'
import {
  showField,
  isTimeField,
  isNameField,
  getIdFieldForLinkableField,
  getTypeForLinkableField,
  isLinkableField} from '../../models/entities/entity'

const EntityShow = ({entity, onSongPlay, history}) => {
  if (entity === undefined || entity === null) {
    return (
      <div className="entity-show">
        Can't find entity ¯\_( ͡° ͜ʖ ͡°)_/¯
      </div>
    )
  }
  const coverArtRoute = entity instanceof Release ? 'release/' : 'release-group/'
  const coverArtUrl = 'http://coverartarchive.org/' + coverArtRoute + entity.id + '/front'
  return (
    <div className="entity-show">
      {entity instanceof Release || entity instanceof ReleaseGroup
          ? <img className="entity-show-cover-image"
                 src={coverArtUrl}
                 height="196"
                 width="196"
                 onError={(e) => {
                   e.target.src = 'http://www.yadavsamaj.co.in/wp-content/uploads/2013/12/Image-not-found.gif'
                 }}/>
          : ''}
      <div className="entity-show-fields">
        {Object.keys(entity).map((field) => {
          if (showField(field) === false) return ''
          let values = entity[field] instanceof Array
              ? entity[field]
              : (entity[field] === '' || entity[field] === undefined
                  ? ['----']
                  : [entity[field]])
          if (isTimeField(field)) {
            values = values.map((value) => formatTime(value))
          } else if (isLinkableField(field)) {
            values = values.map((value, i) => {
              return (<div className="entity-show-value-link" onClick={() => {
                const entityType = getTypeForLinkableField(field)
                const entityId = entity[getIdFieldForLinkableField(field)][i]
                history.push('/' + entityType + '/' + entityId)
              }}>{value}</div>)
            })
          } else if (isNameField(field)) {
            values = values.map((value) => {
              return (<div className="entity-show-value-link" onClick={() => {
                history.push('/' + entity.type + '/' + entity.id)
              }}>{value}</div>)
            })
          }
          return (
            <div key={field}>
              <span className="entity-show-label">{field}: </span>
              {values.map((value, i) => <div key={i} className="entity-show-value">{value}</div>)}
            </div>
          )
        })}
      </div>
      {entity instanceof Playable
          ? <button className="btn btn-primary entity-show-play-button" onClick={onSongPlay}>▶</button>
          : ''}
    </div>
  )
}

export default withRouter(EntityShow)
