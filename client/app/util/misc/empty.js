export function isEmpty(value) {
  if (value === undefined || value === null) return true
  if (value instanceof Array) {
    return value.length === 0
  } else if (typeof value === 'string') {
    return value === ''
  } else if (typeof value === 'object') {
    // This is questionable...
    return isEmpty(Object.keys(value))
  } else {
    return false
  }
}

export function isNotEmpty(value) {
  return !isEmpty(value)
}
