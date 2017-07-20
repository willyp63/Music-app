import React from 'react'
import { connect } from 'react-redux'
import { isEmpty, isNotEmpty } from '../../../util/misc/empty'

import { fetchEntity } from '../../../actions/entity_actions'
import { playTrack } from '../../../actions/player_actions'

import AppWrapper from '../../app_wrapper'
import EntityShow from './entity_show'

class EntityshowContainerComponent extends React.Component {
  constructor(props) {
    super(props)
    if(isEmpty(props.entity)) props.fetchEntity(props.entityType, props.mbid)
  }
  componentWillReceiveProps(newProps) {
    if(isEmpty(newProps.entity)) newProps.fetchEntity(newProps.entityType, newProps.mbid)
  }
  render() {
    return (
      <AppWrapper>
        <EntityShow entity={this.props.entity} onTrackPlay={() => {
          this.props.onTrackPlay(this.props.entity)
        }}/>
      </AppWrapper>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  return {
    entity: state.entities[match.params.mbid],
    mbid: match.params.mbid,
    entityType: parseInt(match.params.entityType)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTrackPlay: (entity) => dispatch(playTrack(entity)),
    fetchEntity: (entityType, mbid) => {
      dispatch(fetchEntity(entityType, mbid))
    }
  }
}

const EntityShowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityshowContainerComponent)

export default EntityShowContainer
