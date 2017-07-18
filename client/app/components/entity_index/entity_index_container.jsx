import React from 'react'
import {connect} from 'react-redux'
import {isEmpty} from '../../util/js_utils'

import App from '../app'
import EntityIndexItem from './entity_index_item'
import {playSong} from '../../actions/player_actions'

const EntityIndex = ({entities, onSongPlay, history}) => {
  const orderedEntities = Object.values(entities).sort((a, b) => b.score - a.score)
  if (isEmpty(orderedEntities)) {
    return (
      <App showSearchBar={true}>
        <div className="entity-index-placeholder">
          No matching entities found ¯\_( ͡° ͜ʖ ͡°)_/¯
        </div>
      </App>
    )
  }
  return (
    <App showSearchBar={true}>
      <div className="entity-index">
        {orderedEntities.map((entity) =>
            (<EntityIndexItem key={entity.id}
                              entity={entity}
                              onSongPlay={() => onSongPlay(entity)}/>))}
      </div>
    </App>
  )
}

const mapStateToProps = (state) => {
  return {
    entities: state.entities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSongPlay: (result) => dispatch(playSong(result))
  }
}

const EntityIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityIndex)

export default EntityIndexContainer
