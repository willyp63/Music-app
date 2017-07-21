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
      const ytid = response.result.items[0].id.videoId
      gapi.client.youtube.videos.list({
        id: ytid,
        part: 'contentDetails'
      }).execute((response) => {
        const duration = parseDuration(response.items[0].contentDetails.duration)
        resolve({ytid, duration})
      })
    })
  })
}

function parseDuration(durationStr) {
  const matches = durationStr.match(/PT(\d*)M(\d*)S/)
  return isNotEmpty(matches)
      ? parseInt(matches[1]) * 60 + parseInt(matches[2])
      : 0
}
