import React from 'react'

import SharedPlayButtonFormatter from '../shared/play_button'

const EXPECTED_CALLBACK_NAME = 'onTrackPlay'

export default function PlayButtonFormatter(_, {props}) {
  return SharedPlayButtonFormatter(
      props[EXPECTED_CALLBACK_NAME], 'entity-index-item')
}
