import React from 'react'
import {connect} from 'react-redux'
import {isEmpty} from '../../util/js_utils'

import App from '../app'
import EntityShow from './entity_show'
import {fetchEntities} from '../../actions/entity_actions'
import {playSong} from '../../actions/player_actions'

class EntityShowContainerComponent extends React.Component {
  componentDidMount() {
    if (isEmpty(this.props.entity)) {
      this.props.fetchEntity(parseInt(this.props.entityType), this.props.entityId)
    }
  }
  componentWillReceiveProps(newProps) {
    if (isEmpty(newProps.entity)) {
      newProps.fetchEntity(parseInt(newProps.entityType), newProps.entityId)
    }
  }
  render () {
    return (
      <App showSearchBar={false}>
        <EntityShow entity={this.props.entity} onSongPlay={this.props.onSongPlay}/>
      </App>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  const entityId = match.params.entityId
  const entityType = match.params.entityType
  return {
    entityId,
    entityType,
    entity: state.entities[entityId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSongPlay: (result) => dispatch(playSong(result)),
    fetchEntity: (type, id) => dispatch(fetchEntities(type, {id}))
  }
}

const EntityShowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityShowContainerComponent)

export default EntityShowContainer
