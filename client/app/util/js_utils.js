export function isEmpty(value) {
  if (value === undefined || value === null) return true
  if (value instanceof Array) {
    return value.length === 0
  } else if (typeof value === 'string') {
    return value === ''
  } else {
    return false
  }
}

export const isNotEmpty = (strOrArr) => !isEmpty(strOrArr)
