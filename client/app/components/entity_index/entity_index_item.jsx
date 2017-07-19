import React from 'react'

import { isEmpty, isNotEmpty } from '../../util/misc/empty'
import INDEX_ENTITY_SCHEMA from '../../entities/schemas/index'

function getColumn(entity, field, fieldProperties, props) {
  let classNames = []
  if (isNotEmpty(fieldProperties.width.xs)) {
    classNames.push('col-xs-' + fieldProperties.width.xs)
  }
  if (isNotEmpty(fieldProperties.width.md)) {
    classNames.push('col-md-' + fieldProperties.width.md)
  }

  const dependentFields = {}
  if(isNotEmpty(fieldProperties.dependentFields)) {
    fieldProperties.dependentFields.forEach((dependentField) => {
      dependentFields[dependentField] = entity[dependentField]
    })
  }

  const formatter = fieldProperties.formatter
  return (
    <div key={field} className={classNames.join(' ')}>
      {formatter(entity[field], dependentFields, props)}
    </div>
  )
}

const EntityIndexItem = ({entity, onTrackPlay}) => {
  if (isEmpty(entity)) return null
  const columns = []
  const typeSchema = INDEX_ENTITY_SCHEMA[entity.type]
  Object.keys(typeSchema)
      .sort((a, b) => typeSchema[a].order - typeSchema[b].order)
      .forEach((field) => {
    const fieldProperties = typeSchema[field]
    if (fieldProperties.visible) {
      columns.push(getColumn(entity, field, fieldProperties, {onTrackPlay}))
    }
  })
  return (
    <div className="row entity-index-item">
      {columns}
    </div>
  )
}

export default EntityIndexItem
