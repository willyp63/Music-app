const Express = require('express')
const path = require('path')
const youtubeStream = require('youtube-audio-stream')

const STYLES_PATH = path.resolve(__dirname, '../client/styles')
const SCRIPTS_PATH = path.resolve(__dirname, '../client/scripts')
const INDEX_HTML_PATH = path.resolve(__dirname, '../client/index.html')

const app = Express()

app.get('/', function(req, res) {
  res.sendFile(INDEX_HTML_PATH)
})

/// Returns the Youtube streaming url for the given video id.
const getYoutubeUrl = (videoId) => `http://youtube.com/watch?v=${videoId}`

/// Attempts to stream audio for the given Youtube video id.
///
/// [ytid] (required): The Youtube video id.
app.get('/stream', function (req, res) {
  youtubeStream(getYoutubeUrl(req.query.ytid)).pipe(res)
})

app.use('/styles', Express.static(STYLES_PATH))
app.use('/scripts', Express.static(SCRIPTS_PATH))

app.use(function(req, res, next) {
  try {
    next()
  } catch (exception) {
    res.status(500).send(exception)
  }
})

const port = process.env.PORT || 8080
app.listen(port, function () {
  console.log(`Serving app @ http://localhost:${port}/#/`)
})
