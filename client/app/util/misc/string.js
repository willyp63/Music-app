import { isEmpty, isNotEmpty } from './empty'

/// Parses a string of the form '?x=1&y=2' and returns the params as an
/// object, in this case {x: 1, y: 2}.
export const parseUrlParamsString = (str) => {
  let matches = str.match(/\?(.*)/)
  if (isEmpty(matches) || isEmpty(matches[1])) return {}
  const paramsStr =  matches[1]
  const paramStrings = paramsStr.split('&')
  const params = {}
  paramStrings.forEach((paramStr) => {
    matches = paramStr.match(/(.*)=(.*)/)
    if (isNotEmpty(matches) &&
        isNotEmpty(matches[1]) &&
        isNotEmpty(matches[2])) {
      params[matches[1]] = matches[2]
    }
  })
  return params
}

/// Returns a URL with the given url as a base and the given params added on
/// in the form '{baseUrl}?{field1}={value1}&...'.
export const getUrlWithUrlAndParams = (baseUrl, params) => {
  const paramsStr = Object.keys(params)
      .filter((key) => isNotEmpty(key) && isNotEmpty(params[key]))
      .map((key) => key + '=' + encodeURIComponent(params[key]))
      .join('&')
  return isNotEmpty(paramsStr) ? (baseUrl + '?' + paramsStr) : baseUrl
}
