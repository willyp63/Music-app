import React from 'react'
import {connect} from 'react-redux'
import {isEmpty, isNotEmpty} from '../../util/js_utils'

const sourceBaseUrl = 'http://localhost:8080/stream?ytid=';

class Player extends React.Component {
  componentDidMount() {
    this.adjustContent()
    $(window).resize(() => this.adjustContent())
  }
  componentWillReceiveProps(newProps) {
    if (isNotEmpty(newProps.song.ytid)) {
      var audioPlayer = $('.audio-player')[0]
      audioPlayer.load()
      audioPlayer.addEventListener('canplay', () => {audioPlayer.play()})
    }
    this.adjustContent()
  }
  adjustContent() {
    var newHeight = window.innerHeight - $('#search-bar').height() - $('#audio-player-bar').height()
    $('.content').height(newHeight)
  }
  render() {
    if (isEmpty(this.props.song)) {
      return (<div id="audio-player-bar"></div>)
    }
    const songName = this.props.song.name
    const artistNames = this.props.song.artistNames
    const ytid = this.props.song.ytid
    return (
      <div id="audio-player-bar">
        <div className="audio-player-track-info">
          {songName + ' - ' + (isNotEmpty(artistNames) ? artistNames.join(', ') : '')}
        </div>
        <audio className="audio-player" controls>
          {isNotEmpty(ytid) ? <source src={sourceBaseUrl + ytid}/> : ''}
        </audio>
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
