import React from 'react'
import { connect } from 'react-redux'

import { closePlayer } from '../actions/player_actions'

import { isEmpty, isNotEmpty } from '../util/misc/empty'
import { adjustScrollContainerHeightToFit } from '../util/dom/app'
import ENTITY_TYPE from '../entities/type'

const STREAM_BASE_URL = '/stream?ytid='

const AUTO_PLAY = false

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isPlaying: false}
  }
  componentWillReceiveProps(newProps) {
    if (isNotEmpty(newProps.track.ytid)) {
      const player = $('#audio-player')[0]
      player.load()
      player.addEventListener('play', () => this.setState({isPlaying: true}))
      player.addEventListener('pause', () => this.setState({isPlaying: false}))
    }
    adjustScrollContainerHeightToFit()
  }
  componentDidUpdate() {
    adjustScrollContainerHeightToFit()
  }
  play() {
    $('#audio-player')[0].play()
  }
  pause() {
    $('#audio-player')[0].pause()
  }
  restart() {
    $('#audio-player')[0].currentTime = 0
  }
  render() {
    if (isEmpty(this.props.track)) return null
    let playerButtons = []
    if (isEmpty(this.props.track.ytid)) {
      playerButtons.push(<button type="button"
                                 key="asterisk"
                                 className="btn btn-primary">
                           <span className="glyphicon glyphicon-asterisk" aria-hidden="true"></span>
                         </button>)
    } else {
      playerButtons.push(<button type="button"
                                 key="step-backward"
                                 className="btn btn-primary"
                                 onClick={this.restart}>
                           <span className="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
                         </button>)
      playerButtons.push(this.state.isPlaying
          ? (<button type="button"
                     key="pause"
                     className="btn btn-primary"
                     onClick={this.pause}>
               <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
             </button>)
          : (<button type="button"
                     key="play"
                     className="btn btn-primary"
                     onClick={this.play}>
               <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
             </button>))
      playerButtons.push(<button type="button"
                                 key="step-forward"
                                 className="btn btn-primary"
                                 onClick={this.props.onClose}>
                           <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                         </button>)
    }
    const audioSource = isNotEmpty(this.props.track.ytid)
        ? (<source src={STREAM_BASE_URL + this.props.track.ytid}/>)
        : ''
    return (
      <div className="container">
      	<div className="row audio-player-top-row">
      		<div className="col-xs-6 col-md-8 audio-player-track-info">
            <div>{this.props.track.artist.name + ' - ' + this.props.track.name}</div>
          </div>
          <div className="col-xs-6 col-md-4 audio-player-buttons">
            {playerButtons}
          </div>
        </div>
        <audio id="audio-player" autoPlay={AUTO_PLAY}>{audioSource}</audio>
      </div>
    )
  }
}

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
)(Player)

export default PlayerContainer
