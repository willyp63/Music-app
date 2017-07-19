import React from 'react'
import {connect} from 'react-redux'
import {isEmpty} from '../../util/js_utils'

import EntityIndexItem from './entity_index_item'
import {playSong} from '../../actions/player_actions'

const EntityIndex = ({entities, onSongPlay, history}) => {
  const orderedEntities = Object.values(entities).sort((a, b) => b.score - a.score)
  const content = orderedEntities.map((entity) => {
    return (
      <EntityIndexItem key={entity.id}
                       entity={entity}
                       onSongPlay={() => onSongPlay(entity)}/>
    )
  })
  return (
    <div className="entity-index">{content}</div>
  )
}

const mapStateToProps = (state) => {
  return {
    entities: state.entities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSongPlay: (entity) => dispatch(playSong(entity))
  }
}

const EntityIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityIndex)

export default EntityIndexContainer
