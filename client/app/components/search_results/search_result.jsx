import React from 'react'

import SCHEMA from './schema'
import { isEmpty, isNotEmpty } from '../../util/misc/empty'
import { getNestedFieldValue } from '../../util/misc/nested_field'

const SearchResult = (props) => {
  if (isEmpty(props.result)) return null
  const columns = []
  const typeSchema = SCHEMA[props.result.type]
  Object.keys(typeSchema)
      .sort((a, b) => typeSchema[a].order - typeSchema[b].order)
      .forEach((field) => {
    const fieldProperties = typeSchema[field]
    if (fieldProperties.visible) {
      columns.push(_getColumn(props.result, field, fieldProperties, props))
    }
  })
  return (
    <div className="my-row search-result">{columns}</div>
  )
}

const _getColumn = (entity, field, fieldProperties, props) => {
  const columnClassName = isNotEmpty(fieldProperties.width)
      ? 'my-col-' + fieldProperties.width
      : ''
  const fieldValue = getNestedFieldValue(entity, field)
  return (
    <div key={field} className={columnClassName}>
      {fieldProperties.component(fieldValue, {props})}
    </div>
  )
}

export default SearchResult
