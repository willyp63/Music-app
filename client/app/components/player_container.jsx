import React from 'react'
import { connect } from 'react-redux'
import { isEmpty, isNotEmpty } from '../util/misc/empty'

import { adjustScrollContainerHeightToFit } from '../util/dom/app'

const STREAM_BASE_URL = '/stream?ytid='

const AUTO_PLAY = false

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      currentProgress: 0
    }
  }
  play() {
    this.getAudioPlayer().play()
  }
  pause() {
    this.getAudioPlayer().pause()
  }
  restart() {
    this.getAudioPlayer().currentTime = 0
  }
  getAudioPlayer() {
    return $('#audio-player')[0]
  }
  updateCurrentProgress() {
    const player = this.getAudioPlayer()
    const trackDuration = this.props.track.duration / 1000
    const currentProgress = isNotEmpty(player)
        ? Math.floor(player.currentTime / trackDuration * 100)
        : 0
    this.setState({currentProgress})
  }
  componentWillReceiveProps(newProps) {
    if (isNotEmpty(newProps.track.ytid)) {
      const player = this.getAudioPlayer()
      if (isEmpty(player)) return
      player.load()
      player.addEventListener('play', () => this.setState({isPlaying: true}))
      player.addEventListener('pause', () => this.setState({isPlaying: false}))
      setInterval(this.updateCurrentProgress.bind(this), 1000)
    }
    adjustScrollContainerHeightToFit()
  }
  componentWillUpdate() {
    adjustScrollContainerHeightToFit()
  }
  render() {
    if (isEmpty(this.props.track)) return null
    let playerButtons = []
    if (isEmpty(this.props.track.ytid)) {
      playerButtons.push(<button type="button"
                                 className="btn btn-primary">
                           <span className="glyphicon glyphicon-asterisk" aria-hidden="true"></span>
                         </button>)
    } else {
      playerButtons.push(<button type="button"
                                 className="btn btn-primary"
                                 onClick={this.restart.bind(this)}>
                           <span className="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
                         </button>)
      playerButtons.push(this.state.isPlaying
          ? (<button type="button"
                     className="btn btn-primary"
                     onClick={this.pause.bind(this)}>
               <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
             </button>)
          : (<button type="button"
                     className="btn btn-primary"
                     onClick={this.play.bind(this)}>
               <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
             </button>))
      playerButtons.push(<button type="button"
                                 className="btn btn-primary"
                                 onClick={() => { /* TODO */ }}>
                           <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                         </button>)
    }
    const audioSource = isNotEmpty(this.props.track.ytid)
        ? (<source src={STREAM_BASE_URL + this.props.track.ytid}/>)
        : ''
    const currentProgressPercent = this.state.currentProgress + '%'
    return (
      <div className="container">
      	<div className="row audio-player-top-row">
      		<div className="col-xs-6 col-md-8 audio-player-track-info">
            <div>{this.props.track.artist + ' - ' + this.props.track.name}</div>
          </div>
          <div className="col-xs-6 col-md-4 audio-player-buttons">
            {playerButtons}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="progress audio-player-progress-bar">
              <div className="progress-bar"
                   role="progressbar"
                   aria-valuenow={this.state.currentProgress}
                   aria-valuemin="0"
                   aria-valuemax="100"
                   style={{width: currentProgressPercent}}>
              </div>
            </div>
          </div>
        </div>
        <audio id="audio-player" autoPlay>{audioSource}</audio>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    track: state.playingTrack
  }
}

const PlayerContainer = connect(
  mapStateToProps
)(Player)

export default PlayerContainer
