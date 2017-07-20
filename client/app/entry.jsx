import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createHashHistory } from 'history'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import Routes from './components/routes'
import entities from './reducers/entities'
import playingTrack from './reducers/playing_track'

const store = createStore(
  combineReducers({
    entities,
    playingTrack
  }),
  {},
  applyMiddleware(thunk, logger)
)

const history = createHashHistory()

const Root = () => (
  <Provider store={store}>
    <HashRouter history={history}>
      <Routes/>
    </HashRouter>
  </Provider>
)

jQuery(document).ready(() => {
  const root = document.getElementById('root')
  ReactDOM.render(<Root/>, root)
})
