import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {RECEIVE_ENTITIES, CLEAR_ENTITIES} from './actions/entity_actions'
import {REQUEST_YTID, RECEIVE_YTID} from './actions/player_actions'

export const entities = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return Object.assign({}, state, action.entities)
    case CLEAR_ENTITIES:
      return {}
    default:
      return state
  }
}

export const playingSong = (state = null, action) => {
  switch (action.type) {
    case REQUEST_YTID:
      return action.song
    case RECEIVE_YTID:
      return Object.assign({}, state, {ytid: action.ytid})
    default:
      return state
  }
}
