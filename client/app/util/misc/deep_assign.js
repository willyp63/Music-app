export default function deepAssign(a, b) {
  if (typeof b !== 'object') throw 'Unexpected type!!!'
  return _deepAssign(a, b)
}

function _deepAssign(a, b) {
  if (typeof b !== 'object') return b
  const result = Object.assign({}, a || {})
  Object.keys(b).forEach((k) => {
    result[k] = _deepAssign(result[k], b[k])
  })
  return result
}
