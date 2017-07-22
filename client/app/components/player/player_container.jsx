import React from 'react'
import { connect } from 'react-redux'

import { closePlayer } from '../../actions/player_actions'
import Player from './player'

const PlayerContainerComponent = ({track, onClose}) => (
  <div className="player-bar">
    <div className="container">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Player track={track} onClose={onClose} />
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    track: state.playingTrack
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => dispatch(closePlayer())
  }
}

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerContainerComponent)

export default PlayerContainer
