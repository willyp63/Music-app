import { isEmpty, isNotEmpty } from '../misc/empty'

let isGapiLoaded = false
window.onGapiClientLoad = function () {
  gapi.client.load('youtube', 'v3', function () {
    gapi.client.setApiKey('AIzaSyDjAO8CZLZ6zS9ozFqtkKvjncFJUxDESzY')
    isGapiLoaded = true
  });
}

export function getYtid(name, artist) {
  return new Promise((resolve, reject) => {
    if (isGapiLoaded === false) return reject('Gapi not loaded yet.')
    if (isEmpty(name) || isEmpty(artist)) return reject('Must provide [name] and [artist].')
    gapi.client.youtube.search.list({
      q: name + ' ' + artist,
      part: 'snippet',
      maxResults: '1'
    }).execute((response) => {
      resolve(isNotEmpty(response.result.items)
          ? response.result.items[0].id.videoId
          : null)
    })
  })
}
