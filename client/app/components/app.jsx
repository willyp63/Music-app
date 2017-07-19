import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {resizeAppContent} from '../util/jquery_utils'

import SearchFormContainer from './search_form_container'
import PlayerContainer from './player_container'
import EntityIndexContainer from './entity_index/entity_index_container'

class App extends React.Component {
  componentDidMount() {
    resizeAppContent()
    $(window).resize(resizeAppContent)
  }
  render() {
    return (
      <div>
        <div id="search-bar">
          <SearchFormContainer/>
        </div>
        <div id="content">
          <Switch>
            <Route exact path="/" component={EntityIndexContainer} />
          </Switch>
        </div>
        <div id="player-bar">
          <PlayerContainer/>
        </div>
      </div>
    )
  }
}

export default App
