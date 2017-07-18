import React from 'react'
import {connect} from 'react-redux'
import {isEmpty, isNotEmpty} from '../../util/js_utils'

const sourceBaseUrl = '/stream?ytid='

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isPlaying: false}
  }
  componentDidMount() {
    this.adjustContent()
    $(window).resize(() => this.adjustContent())
  }
  componentWillReceiveProps(newProps) {
    if (isNotEmpty(newProps.song.ytid)) {
      var audioPlayer = $('.audio-player')[0]
      audioPlayer.load()
      this.setState({isPlaying: false})
      audioPlayer.addEventListener('canplay', () => {
        audioPlayer.play()
        this.setState({isPlaying: true})
      })
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
        <span className="audio-player-track-info">
          {songName + ' - ' + (isNotEmpty(artistNames) ? artistNames.join(', ') : '')}
        </span>
        <span>
          {this.state.isPlaying
              ? (<button className="btn btn-primary audio-player-button" onClick={() => {
                $('.audio-player')[0].pause()
                this.setState({isPlaying: false})
              }}>❚❚</button>)
              : (<button className="btn btn-primary audio-player-button" onClick={() => {
                $('.audio-player')[0].play()
                this.setState({isPlaying: true})
              }}>▶</button>)}
        </span>
        <audio className="audio-player">
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
