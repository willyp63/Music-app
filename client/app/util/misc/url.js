import { isEmpty, isNotEmpty } from './empty'

/// Returns [url]'s params.
export const getUrlParams = (url) => {
  let matches = url.match(/\?(.+)$/)
  if (isEmpty(matches)) return {}
  const paramsStr =  matches[1]
  const paramStrings = paramsStr.split('&')
  const params = {}
  paramStrings.forEach((paramStr) => {
    matches = paramStr.match(/(.+)=(.+)/)
    if (isNotEmpty(matches) &&
        isNotEmpty(matches[1]) &&
        isNotEmpty(matches[2])) {
      params[matches[1]] = matches[2]
    }
  })
  return params
}

/// Updates [url]'s params by merging them with [params], and returns the
/// resulting URL.
export const getUrlWithUpdatedParams = (url, params) => {
  const baseUrlMatches = url.match(/^(.+)(?:\?|$)/)
  const baseUrl = isNotEmpty(baseUrlMatches) ? baseUrlMatches[1] : ''
  const updatedParams = Object.assign(getUrlParams(url), params)
  const paramsStr = Object.keys(updatedParams)
      .filter((key) => isNotEmpty(key) && isNotEmpty(updatedParams[key]))
      .map((key) => key + '=' + encodeURIComponent(updatedParams[key]))
      .join('&')
  return isNotEmpty(paramsStr) ? (baseUrl + '?' + paramsStr) : baseUrl
}
