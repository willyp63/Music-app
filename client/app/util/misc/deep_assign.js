/// Merges the properties of [b] onto [a] in a "deep" way.
///
/// Say [a] = {c: 1, d: {e: 2, f: 3}} and [b] = {c: 4, d: {e: 5}}.
/// The result would be {c: 4, d: {e: 5, f: 3}}. Notice that a.d.f persists.
export default const deepAssign = (a, b) => {
  if (typeof b !== 'object') throw 'Unexpected type!!!'
  return _deepAssign(a, b)
}

const _deepAssign = (a, b) => {
  if (typeof b !== 'object') return b
  const result = Object.assign({}, a || {})
  Object.keys(b).forEach((k) => {
    result[k] = _deepAssign(result[k], b[k])
  })
  return result
}
