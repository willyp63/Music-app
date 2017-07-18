import React from 'react'

import SearchBarContainer from './search_bar/search_bar_container'

class App extends React.Component {
  componentDidMount() {
    this.adjustContent()
  }
  adjustContent() {
    var newHeight = window.innerHeight - $('#search-bar').height() - $('#audio-player-bar').height()
    $('.content').height(newHeight)
  }
  render() {
    return (
      <div>
        <div className="background-container"></div>
        {this.props.showSearchBar ? (<SearchBarContainer/>) : (<div id="search-bar" style={{height: 0}}></div>)}
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
