import React from 'react'

import SearchBarContainer from './search_bar/search_bar_container'
import PlayerContainer from './player/player_container'

class App extends React.Component {
  componentDidMount() {
    // (IOS bug fix) when scrolling url bar disappears.
    $(window).scroll(() => $('#app').height(window.innerHeight))
  }
  render() {
    return (
      <div id="app">
        <SearchBarContainer />
        <div id="scroll-container">{this.props.children}</div>
        <PlayerContainer />
      </div>
    )
  }
}

export default App
