import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from '../../../util/misc/empty'

import AppWrapper from '../../app_wrapper'
import EntityIndexItem from './entity_index_item'
import { playTrack } from '../../../actions/player_actions'

const EntityIndex = ({entities, onTrackPlay}) => {
  const orderedEntities = Object.values(entities).sort((a, b) => a.order - b.order)
  const content = orderedEntities.map((entity) => {
    return (
      <EntityIndexItem key={entity.mbid}
                       entity={entity}
                       onTrackPlay={() => onTrackPlay(entity)}/>
    )
  })
  return (
    <AppWrapper>
      <div className="entity-index">{content}</div>
    </AppWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    entities: state.entities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTrackPlay: (entity) => dispatch(playTrack(entity))
  }
}

const EntityIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityIndex)

export default EntityIndexContainer
