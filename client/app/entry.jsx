import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'

import {entities, playingSong} from './reducers'

import EntityIndexContainer from './components/entity_index/entity_index_container'
import EntityShowContainer from './components/entity_show/entity_show_container'
import PlayerContainer from './components/player/player_container'

const store = createStore(
  combineReducers({
    entities,
    playingSong
  }),
  {},
  applyMiddleware(thunk, logger)
)

const history = createHashHistory()

const Root = () => (
  <Provider store={store}>
    <HashRouter history={history}>
      <div>
        <Switch>
          <Route path="/:entityType/:entityId" component={EntityShowContainer} />
          <Route exact path="/:entityType" component={EntityIndexContainer} />
          <Route exact path="/" component={EntityIndexContainer} />
        </Switch>
        <PlayerContainer/>
      </div>
    </HashRouter>
  </Provider>
)

jQuery(document).ready(() => {
  const root = document.getElementById('root')
  ReactDOM.render(<Root/>, root)
})
