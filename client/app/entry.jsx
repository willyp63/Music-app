import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createHashHistory} from 'history'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import App from './components/app'
import {entities, playingSong} from './reducers'

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
      <App/>
    </HashRouter>
  </Provider>
)

jQuery(document).ready(() => {
  const root = document.getElementById('root')
  ReactDOM.render(<Root/>, root)
})
