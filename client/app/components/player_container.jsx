import React from 'react'
import { connect } from 'react-redux'

import { closePlayer } from '../actions/player_actions'

import { isEmpty, isNotEmpty } from '../util/misc/empty'
import { formatTimeMinutesSeconds } from '../formatters/misc/time'
import ENTITY_TYPE from '../entities/type'

const STREAM_BASE_URL = '/stream?ytid='

const AUTO_PLAY = false

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      currentTime: 0
    }
  }
  componentWillReceiveProps(newProps) {
    if (isNotEmpty(newProps.track.ytid)) {
      const player = this.audioPlayer()
      if (isEmpty(player)) return
      player.load()
      player.addEventListener('play', () => this.setState({isPlaying: true}))
      player.addEventListener('pause', () => this.setState({isPlaying: false}))
      player.addEventListener('timeupdate', (e) => {
        $('#audio-player-progress-bar').val(e.target.currentTime)
        this.setState({currentTime: e.target.currentTime})
      })
      $('#audio-player-progress-bar').val(0)
    }
  }
  componentDidUpdate() {
    // (Mobile bug fix) not sure exactly why this is needed...
    $('#app').height(window.innerHeight)
  }
  audioPlayer() {
    return $('#audio-player')[0] || {}
  }
  updateCurrentTime(newTime) {
    this.audioPlayer().currentTime = newTime
  }
  render() {
    if (isEmpty(this.props.track)) return null

    const audioSource = isNotEmpty(this.props.track.ytid)
        ? (<source src={STREAM_BASE_URL + this.props.track.ytid}/>)
        : ''

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="row audio-player-top-bar">
          		<span className="audio-player-track-info">
                {this.props.track.artist.name + ' - ' + this.props.track.name}
              </span>
              <div className="audio-player-buttons">
                <div className="input-group-btn">
                  <div className="btn-group" role="group">
                    <button className="btn btn-primary"
                            onClick={() => {
                              this.state.isPlaying
                                  ? this.audioPlayer().pause()
                                  : this.audioPlayer().play()
                            }}>
                      <span className={'glyphicon glyphicon-' + (this.state.isPlaying ? 'pause' : 'play')}
                            aria-hidden="true">
                      </span>
                    </button>
                    <button className="btn btn-primary" onClick={this.props.onClose}>
                      <span className="	glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row audio-player-progress-bar-container">
              <div className="audio-player-time-labels">
                <span className="audio-player-current-time">
                  {formatTimeMinutesSeconds(this.state.currentTime)}
                </span>
                <span className="audio-player-duration">
                  {formatTimeMinutesSeconds(this.props.track.duration)}
                </span>
              </div>
              <input id="audio-player-progress-bar"
                     type="range"
                     min="0"
                     max={this.props.track.duration}
                     onChange={(e) => this.updateCurrentTime(e.target.value)}/>
            </div>
            <audio id="audio-player" autoPlay={AUTO_PLAY}>{audioSource}</audio>
          </div>
          <div className="col-md-1"></div>
        </div>
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
