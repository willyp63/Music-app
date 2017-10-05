import { isEmpty, isNotEmpty } from '../../misc/empty'
import { YOUTUBE_API_KEY } from '../../../secrets/keys'

/// Queries Youtube for the first video matching the arguments provided, and
/// returns that videos ytid and duration.
export const getYtInfo = (name, artist) => {
  return new Promise((resolve, reject) => {
    if (isGapiLoaded === false) return reject('Gapi not loaded yet.')
    if (isEmpty(name) || isEmpty(artist)) {
      return reject('Must provide [name] and [artist].')
    }

    const query = name + ' ' + artist
    gapi.client.youtube.search.list({
      q: query,
      part: 'snippet',
      maxResults: '1'
    }).execute((response) => {
      const ytid = response.result.items[0].id.videoId
      gapi.client.youtube.videos.list({
        id: ytid,
        part: 'contentDetails'
      }).execute((response) => {
        const duration =
            parseYtDuration(response.items[0].contentDetails.duration)
        resolve({ytid, duration})
      })
    })
  })
}

/// Accepts a string of the form PT3M46S and return the number of seconds,
/// in this case 226 (3 * 60 + 46).
const parseYtDuration = (durationStr) => {
  const matches = durationStr.match(/PT(\d+)M(\d+)S/)
  return isNotEmpty(matches)
      ? parseInt(matches[1]) * 60 + parseInt(matches[2])
      : 0
}

/// Load GAPI and set API key.
let isGapiLoaded = false
window.onGapiClientLoad = () => {
  gapi.client.load('youtube', 'v3', () => {
    gapi.client.setApiKey(YOUTUBE_API_KEY)
    isGapiLoaded = true
  })
}
