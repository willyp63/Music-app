export function parseUrlQueryString(str) {
  if (str.match(/\?/) === null) return {}
  const paramsStr = str.match(/\?(.*)/)[1] || ''
  const paramStrings = paramsStr.split('&')
  const params = {}
  paramStrings.forEach((paramStr) => {
    const matches = paramStr.match(/(.*)=(.*)/)
    if (matches === null) return
    params[matches[1]] = matches[2]
  })
  return params
}
