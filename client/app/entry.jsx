import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createHashHistory } from 'history'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

import Routes from './routes'

import searchResults from './reducers/search_results'
import playingTrack from './reducers/playing_track'

/// App store.
///
/// Each new reducer must be added here.
const store = createStore(
  combineReducers({
    searchResults,
    playingTrack
  }),
  {},
  applyMiddleware(thunk, logger)
)

/// Root component.
///
/// Provides the store and hash history.
const Root = () => (
  <Provider store={store}>
    <HashRouter history={createHashHistory()}>
      <Routes />
    </HashRouter>
  </Provider>
)

/// Render React app after document is ready.
jQuery(document).ready(() => {
  ReactDOM.render(<Root/>, document.getElementById('root'))
})
