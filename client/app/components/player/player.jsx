import React from 'react';

import { isEmpty, isNotEmpty } from '../../util/misc/empty'
import MyAudioPlayer from './my_audio_player'
import { formatTimeMinutesSeconds } from '../../util/misc/time'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      currentTime: 0
    }
    this.audioPlayer = new MyAudioPlayer(AUDIO_PLAYER_ID, {
      onPlay: () => {
        this.setState({playing: true})
      },
      onPause: () => {
        this.setState({playing: false})
      },
      onTimeUpdate: (currentTime) => {
        this.setState({currentTime: currentTime})
      },
    })
  }
  componentWillReceiveProps(newProps) {
    if (isNotEmpty(newProps.track) && isNotEmpty(newProps.track.ytid)) {
      this.audioPlayer.load()
      this.setState({playing: false})
    }
  }
  componentDidUpdate() {
    // (Mobile bug fix) not sure exactly why this is needed...
    $('#app').height(window.innerHeight)
  }
  render() {
    if (isEmpty(this.props.track)) return null
    const trackInfo = this.props.track.artist.name
        + ' - ' + this.props.track.name
    const playPauseButtonGlyph = this.state.playing ? 'pause' : 'play'
    const audioSource = isNotEmpty(this.props.track.ytid)
        ? (<source src={STREAM_BASE_URL + this.props.track.ytid}/>)
        : ''
    return (
      <div>
        <div className="row player-top-row">
          <span className="player-track-info">{trackInfo}</span>
          <div className="player-controls">
            <div className="input-group-btn">
              <div className="btn-group" role="group">
                <button className="btn btn-primary"
                        onClick={() => {
                          this.state.playing
                              ? this.audioPlayer.pause()
                              : this.audioPlayer.play()
                        }}>
                  <span className={'glyphicon glyphicon-' + playPauseButtonGlyph}
                        aria-hidden="true">
                  </span>
                </button>
                <button className="btn btn-primary" onClick={this.props.onClose}>
                  <span className="glyphicon glyphicon-chevron-down"
                        aria-hidden="true">
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row player-bottom-row">
          <div className="player-time-labels">
            <span className="player-current-time-label">
              {formatTimeMinutesSeconds(this.state.currentTime)}
            </span>
            <span className="player-end-time-label">
              {formatTimeMinutesSeconds(this.props.track.duration)}
            </span>
          </div>
          <input className="player-progress-bar"
                 type="range"
                 min="0"
                 value={this.state.currentTime}
                 max={this.props.track.duration}
                 onChange={(e) => {
                   this.audioPlayer.setCurrentTime(e.target.value)
                 }} />
        </div>
        <audio id={AUDIO_PLAYER_ID} autoPlay={AUTO_PLAY}>{audioSource}</audio>
      </div>
    )
  }
}

const AUTO_PLAY = true

const STREAM_BASE_URL = '/stream?ytid='

const AUDIO_PLAYER_ID = 'audio-player'

export default Player
