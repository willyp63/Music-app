import React from 'react'
import {connect} from 'react-redux'
import {isEmpty, isNotEmpty} from '../util/js_utils'

import {resizeAppContent} from '../util/jquery_utils'

const sourceBaseUrl = '/stream?ytid='

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
    const trackDuration = this.props.song.duration / 1000
    const currentProgress = isNotEmpty(player)
        ? Math.floor(player.currentTime / trackDuration * 100)
        : 0
    this.setState({currentProgress})
  }
  componentWillReceiveProps(newProps) {
    if (isNotEmpty(newProps.song.ytid)) {
      const player = this.getAudioPlayer()
      if (isEmpty(player)) return
      player.load()
      player.addEventListener('play', () => this.setState({isPlaying: true}))
      player.addEventListener('pause', () => this.setState({isPlaying: false}))
      setInterval(this.updateCurrentProgress.bind(this), 1000)
    }
    resizeAppContent()
  }
  componentWillUpdate() {
    resizeAppContent()
  }
  render() {
    if (isEmpty(this.props.song)) return null
    let playerButtons = []
    if (isEmpty(this.props.song.ytid)) {
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
    const audioSource = isNotEmpty(this.props.song.ytid)
        ? (<source src={sourceBaseUrl + this.props.song.ytid}/>)
        : ''
    const currentProgressPercent = this.state.currentProgress + '%'
    return (
      <div className="container">
      	<div className="row audio-player">
      		<div className="col-xs-8 col-md-4 audio-player-track-info">
            <div>{this.props.song.artist + ' - ' + this.props.song.name}</div>
          </div>
          <div className="col-xs-0 col-md-4">
            <div className="progress audio-player-progress-bar">
              <div className="progress-bar progress-bar-striped active"
                   role="progressbar"
                   aria-valuenow={this.state.currentProgress}
                   aria-valuemin="0"
                   aria-valuemax="100"
                   style={{width: currentProgressPercent}}>
              </div>
            </div>
          </div>
          <div className="col-xs-4 col-md-4 audio-player-buttons">
            {playerButtons}
          </div>
        </div>
        <audio id="audio-player" autoPlay>{audioSource}</audio>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    song: state.playingSong
  }
}

const PlayerContainer = connect(
  mapStateToProps
)(Player)

export default PlayerContainer
