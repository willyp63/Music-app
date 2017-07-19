import { isEmpty, isNotEmpty } from './empty'

export function parseQueryParamsString(str) {
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

export function getUrlWithQueryParams(baseUrl, queryParams) {
  const queryParamsStr = Object.keys(queryParams)
      .filter((key) => isNotEmpty(key) && isNotEmpty(queryParams[key]))
      .map((key) => key + '=' + queryParams[key])
      .join('&')
  return isNotEmpty(queryParamsStr)
      ? baseUrl + '?' + queryParamsStr
      : baseUrl
}
