import { isEmpty, isNotEmpty } from '../misc/empty'

let isGapiLoaded = false
window.onGapiClientLoad = function () {
  gapi.client.load('youtube', 'v3', function () {
    gapi.client.setApiKey('AIzaSyDjAO8CZLZ6zS9ozFqtkKvjncFJUxDESzY')
    isGapiLoaded = true
  });
}

function getQuery(name, artist) {
  return name + ' ' + artist
}

/*
  Search Youtube with [name] and [artist] for a matching video.

  Returns the ytid of the first search result.

  [name]: *required*
      Track name
  [artist]: *required*
      Track artist
*/
export function getYtid({name, artist}) {
  return new Promise((resolve, reject) => {
    if (isGapiLoaded === false) return reject('Gapi not loaded yet.')
    if (isEmpty(name) || isEmpty(artist)) return reject('Must provide [name] and [artist].')
    gapi.client.youtube.search.list({
      q: getQuery(name, artist),
      part: 'snippet',
      maxResults: '1'
    }).execute((response) => {
      resolve(response.result.items[0].id.videoId)
    })
  })
}
