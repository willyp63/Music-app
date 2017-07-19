import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { adjustScrollContainerHeightToFit } from '../util/dom/app'

import SearchFormContainer from './search_form_container'
import PlayerContainer from './player_container'
import EntityIndexContainer from './entity_index/entity_index_container'

class App extends React.Component {
  componentDidMount() {
    adjustScrollContainerHeightToFit()
    $(window).resize(adjustScrollContainerHeightToFit)
  }
  render() {
    return (
      <div>
        <div id="search-bar">
          <SearchFormContainer/>
        </div>
        <div id="scroll-container">
          <div className="container">
            <div className="row">
              <div className="col-md-12" id="content">
                <Switch>
                  <Route path="/" component={EntityIndexContainer} />
                </Switch>
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
