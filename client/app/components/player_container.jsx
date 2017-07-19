import React from 'react'
import {connect} from 'react-redux'
import {isEmpty, isNotEmpty} from '../util/js_utils'

import {resizeAppContent} from '../util/jquery_utils'

const sourceBaseUrl = '/stream?ytid='

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isPlaying: false}
  }
  play() {
    this.getAudioPlayer().play()
  }
  pause() {
    this.getAudioPlayer().pause()
  }
  getAudioPlayer() {
    return $('#audio-player')[0]
  }
  componentWillReceiveProps(newProps) {
    if (isNotEmpty(newProps.song.ytid)) {
      const player = this.getAudioPlayer()
      player.load()
      player.addEventListener('play', () => this.setState({isPlaying: true}))
      player.addEventListener('pause', () => this.setState({isPlaying: false}))
    }
    resizeAppContent()
  }
  componentWillUpdate() {
    resizeAppContent()
  }
  render() {
    if (isEmpty(this.props.song)) return null
    let playerButton
    if (isEmpty(this.props.song.ytid)) {
      playerButton = (<button type="button"
                              className="btn btn-primary">
                        <span className="glyphicon glyphicon-asterisk" aria-hidden="true"></span>
                      </button>)
    } else {
      playerButton = this.state.isPlaying
          ? (<button type="button"
                     className="btn btn-primary"
                     onClick={this.pause.bind(this)}>
               <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
             </button>)
          : (<button type="button"
                     className="btn btn-primary"
                     onClick={this.play.bind(this)}>
               <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
             </button>)
    }
    const audioSource = isNotEmpty(this.props.song.ytid)
        ? (<source src={sourceBaseUrl + this.props.song.ytid}/>)
        : ''
    return (
      <div className="container">
      	<div className="row audio-player">
      		<div className="col-xs-8 col-md-8 audio-player-track-info">
            <div>{this.props.song.artist + ' - ' + this.props.song.name}</div>
          </div>
          <div className="col-xs-4 col-md-4 audio-player-button">
            {playerButton}
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
