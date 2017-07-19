window.onGapiClientLoad = function () {
  gapi.client.load('youtube', 'v3', function () {
    gapi.client.setApiKey('AIzaSyDjAO8CZLZ6zS9ozFqtkKvjncFJUxDESzY')
    console.log('loaded')
  });
}

export function getYtid(song, onYtId) {
  gapi.client.youtube.search.list({
    q: song.name + ' ' + song.artist,
    part: 'snippet',
    maxResults: '1'
  }).execute(function(response) {
    onYtId(response.result.items[0].id.videoId)
  })
}
