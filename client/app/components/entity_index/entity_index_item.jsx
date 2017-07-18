import React from 'react'

import EntityShow from '../entity_show/entity_show'

const EntityIndexItem = ({entity, onSongPlay}) => (
  <div className="entity-index-item">
    <EntityShow entity={entity} onSongPlay={onSongPlay}/>
  </div>
)

export default EntityIndexItem
