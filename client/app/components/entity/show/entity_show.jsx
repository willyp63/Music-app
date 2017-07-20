import React from 'react'

import { isEmpty, isNotEmpty } from '../../../util/misc/empty'
import { getNestedFieldValue } from '../../../util/misc/nested_field'
import SHOW_ENTITY_SCHEMA from '../../../entities/schemas/show'

function getRow(entity, field, fieldProperties, props) {
  const dependentFields = {}
  if(isNotEmpty(fieldProperties.dependentFields)) {
    fieldProperties.dependentFields.forEach((dependentField) => {
      dependentFields[dependentField] = getNestedFieldValue(entity, dependentField)
    })
  }

  const formatter = fieldProperties.formatter
  return (
    <div key={field}>
      {formatter(getNestedFieldValue(entity, field), dependentFields, props)}
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
