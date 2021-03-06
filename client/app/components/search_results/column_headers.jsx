import React from 'react'

import { isEmpty, isNotEmpty } from '../../util/misc/empty'
import SCHEMA from './schema'

const ColumnHeaders = ({entityType}) => {
  if (isEmpty(entityType)) return null
  const columnHeaders = []
  const typeSchema = SCHEMA[entityType]
  Object.keys(typeSchema)
      .sort((a, b) => typeSchema[a].order - typeSchema[b].order)
      .forEach((field) => {
    const fieldProperties = typeSchema[field]
    if (fieldProperties.visible) {
      columnHeaders.push(_getColumnHeader(field, fieldProperties))
    }
  })
  return (
    <div className="my-row search-results-column-headers">{columnHeaders}</div>
  )
}

const _getColumnHeader = (field, fieldProperties) => {
  const label = isNotEmpty(fieldProperties.label) ? fieldProperties.label : ''
  let className = isNotEmpty(fieldProperties.width)
      ? 'search-result-column-header my-col-' + fieldProperties.width
      : 'search-result-column-header'
  return (<div key={field} className={className}>{label}</div>)
}

export default ColumnHeaders
