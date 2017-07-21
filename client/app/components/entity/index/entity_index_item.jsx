import React from 'react'
import { withRouter } from 'react-router'

import { isEmpty, isNotEmpty } from '../../../util/misc/empty'
import { getNestedFieldValue } from '../../../util/misc/nested_field'
import INDEX_ENTITY_SCHEMA from '../../../entities/schemas/index'

function getColumn(entity, field, fieldProperties, props) {
  const columnClassName = isNotEmpty(fieldProperties.width)
      ? 'my-col-' + fieldProperties.width
      : ''
  const fieldValue = getNestedFieldValue(entity, field)
  return (
    <div key={field} className={columnClassName}>
      {fieldProperties.formatter(fieldValue, {props})}
    </div>
  )
}

const EntityIndexItem = (props) => {
  if (isEmpty(props.entity)) return null

  const columns = []
  const typeSchema = INDEX_ENTITY_SCHEMA[props.entity.type]
  Object.keys(typeSchema)
      .sort((a, b) => typeSchema[a].order - typeSchema[b].order)
      .forEach((field) => {
    const fieldProperties = typeSchema[field]
    if (fieldProperties.visible) {
      columns.push(getColumn(props.entity, field, fieldProperties, props))
    }
  })
  return (
    <div className="my-row entity-index-item">
      {columns}
    </div>
  )
}

export default withRouter(EntityIndexItem)
