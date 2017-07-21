import React from 'react'

import { isEmpty, isNotEmpty } from '../../../util/misc/empty'
import { getNestedFieldValue } from '../../../util/misc/nested_field'
import SHOW_ENTITY_SCHEMA from '../../../entities/schemas/show'

function getRow(entity, field, fieldProperties, props) {
  return (
    <div key={field}>
      {fieldProperties.formatter(getNestedFieldValue(entity, field), {props})}
    </div>
  )
}

const EntityShow = (props) => {
  if (isEmpty(props.entity)) return null
  const rows = []
  const typeSchema = SHOW_ENTITY_SCHEMA[props.entity.type]
  Object.keys(typeSchema)
      .sort((a, b) => typeSchema[a].order - typeSchema[b].order)
      .forEach((field) => {
    const fieldProperties = typeSchema[field]
    if (fieldProperties.visible) {
      rows.push(getRow(props.entity, field, fieldProperties, props))
    }
  })
  return (
    <div className="entity-show">
      {rows}
    </div>
  )
}

export default EntityShow
