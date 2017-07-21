import React from 'react'

import { isEmpty } from '../../util/misc/empty'
import { FAKE_ID_PREFIX } from '../../util/api/last_fm'

export default function NameFormatter(name, {props}) {
  return (
    <div className="entity-index-item-name">
      {props.entity.mbid.startsWith(FAKE_ID_PREFIX)
          ? name
          : (
            <span className="my-link" onClick={() => {
              props.history.push('/' + props.entity.type + '/' + props.entity.mbid)
            }}>{name}</span>
          )}
    </div>
  )
}
