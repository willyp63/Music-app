import { isEmpty } from './empty'

/// Takes a field path of the form '{field1}.{field2}...', and traverses [obj]
/// to get the value.
///
/// In this case obj[field1][field2].
///
/// Will return an empty string if there is not value at [fieldPath].
export const getNestedFieldValue = (obj, fieldPath) => {
  const fields = fieldPath.split('.')
  let val = obj
  for (let i = 0; i < fields.length; i++) {
    if (isEmpty(val)) return ''
    val = val[fields[i]]
  }
  return val
}
