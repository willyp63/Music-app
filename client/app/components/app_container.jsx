import React from 'react'

import SearchBarContainer from './search_bar/search_bar_container'
import PlayerContainer from './player/player_container'

class AppContainer extends React.Component {
  componentDidMount() {
    // (IOS bug fix) when scrolling url bar disappears.
    $(window).scroll(() => $('#app-container').height(window.innerHeight))
  }
  render() {
    return (
      <div id="app-container">
        <SearchBarContainer />
        <div id="scroll-container">{this.props.children}</div>
        <PlayerContainer />
      </div>
    )
  }
}

export default AppContainer
