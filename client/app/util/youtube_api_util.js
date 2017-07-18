import Recording from '../models/entities/recording'
import Release from '../models/entities/release'

window.onGapiClientLoad = function () {
  gapi.client.load('youtube', 'v3', function () {
    gapi.client.setApiKey('AIzaSyDjAO8CZLZ6zS9ozFqtkKvjncFJUxDESzY');
    console.log('loaded');
  });
}

export function getYtid(song, onYtId) {
  if (!(song instanceof Recording) && !(song instanceof Release)) throw 'Unexpected type'
  gapi.client.youtube.search.list({
    q: song.name + ' ' + song.artistNames.join(' '),
    part: 'snippet',
    maxResults: '1'
  }).execute(function(response) {
    onYtId(response.result.items[0].id.videoId)
  });
}
