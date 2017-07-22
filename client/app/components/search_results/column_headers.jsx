import React from 'react'

import { isEmpty, isNotEmpty } from '../../util/misc/empty'
import SCHEMA from './schema'

const ColumnHeaders = ({type}) => {
  if (isEmpty(type)) return null
  const columnHeaders = []
  const typeSchema = SCHEMA[type]
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
  const columnClassName = isNotEmpty(fieldProperties.width)
      ? 'my-col-' + fieldProperties.width
      : ''
  return (
    <div key={field} className={columnClassName}>
      {isNotEmpty(fieldProperties.label) ? fieldProperties.label : ''}
    </div>
  )
}

export default ColumnHeaders
