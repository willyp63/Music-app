import React from 'react'

import SearchBarContainer from './search_bar_container'
import PlayerContainer from './player_container'

class App extends React.Component {
  componentDidMount() {
    // (IOS bug fix) when scrolling url bar disappears.
    $(window).scroll(() => $('#app').height(window.innerHeight))
  }
  render() {
    return (
      <div id="app">
        <div id="search-bar">
          <SearchBarContainer/>
        </div>
        <div id="scroll-container">
          <div className="container">
            <div className="row">
              <div className="col-md-12" id="content">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <div id="player-bar">
          <PlayerContainer/>
        </div>
      </div>
    )
  }
}

export default App
