import { isEmpty, isNotEmpty } from '../../util/misc/empty'

export default class MyAudioPlayer {
  constructor(eleId, {onPlay, onPause, onTimeUpdate}) {
    this.eleId = eleId
    this.onPlay = onPlay
    this.onPause = onPause
    this.onTimeUpdate = onTimeUpdate
  }
  load() {
    const player = this._audioPlayer()
    if (isEmpty(player)) throw 'Failed to find audio element!!!'

    player.load()
    player.addEventListener('play', this.onPlay)
    player.addEventListener('pause', this.onPause)
    player.addEventListener('timeupdate', () => {
      this.onTimeUpdate(this.currentTime())
    })
  }
  play() {
    this._audioPlayer().play()
  }
  pause() {
    this._audioPlayer().pause()
  }
  setCurrentTime(newCurrentTime) {
    this._audioPlayer().currentTime = newCurrentTime
  }
  currentTime() {
    return this._audioPlayer().currentTime
  }
  dispose() {
    player.removeEventListener('play', this.onPlay)
    player.removeEventListener('pause', this.onPause)
    player.removeEventListener('timeupdate', this.onTimeUpdate)
  }
  _audioPlayer() {
    return $('#' + this.eleId)[0]
  }
}
