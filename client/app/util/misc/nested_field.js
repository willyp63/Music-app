import { isEmpty } from './empty'

export function getNestedFieldValue(entity, fieldPath) {
  const fields = fieldPath.split('.')
  let value = entity
  for (let i = 0; i < fields.length; i++) {
    if (isEmpty(value)) return ''
    value = value[fields[i]]
  }
  return value
}
