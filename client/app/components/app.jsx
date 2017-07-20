import React from 'react'

import SearchBarContainer from './search_bar_container'
import PlayerContainer from './player_container'

const App = ({children}) => (
  <div id="app">
    <div id="search-bar">
      <SearchBarContainer/>
    </div>
    <div id="scroll-container">
      <div className="container">
        <div className="row">
          <div className="col-md-12" id="content">
            {children}
          </div>
        </div>
      </div>
    </div>
    <div id="player-bar">
      <PlayerContainer/>
    </div>
  </div>
)

export default App
