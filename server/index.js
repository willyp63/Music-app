const Express = require('express')
const path = require('path')
const youtubeStream = require('youtube-audio-stream')

const STYLES_PATH = path.resolve(__dirname, '../client/styles')
const SCRIPTS_PATH = path.resolve(__dirname, '../client/scripts')
const INDEX_HTML_PATH = path.resolve(__dirname, '../client/index.html')

const app = Express()

/// Serves single page React app.
app.get('/', (_, res) => res.sendFile(INDEX_HTML_PATH))

/// Serve app style sheets & script files.
app.use('/styles', Express.static(STYLES_PATH))
app.use('/scripts', Express.static(SCRIPTS_PATH))

/// Serves an audio stream for the requested Youtube video, via
/// youtube-audio-stream (https://github.com/jameskyburz/youtube-audio-stream)
///
/// [ytid] *required* : The requested Youtube viedo's id
app.get('/stream', (req, res) => {
  youtubeStream(getYoutubeUrl(req.query.ytid)).pipe(res)
})

/// Start server.
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Serving @ http://localhost:${port}/`))

/// Returns the Url for a Youtube video given that video's id.
const getYoutubeUrl = (videoId) => `http://youtube.com/watch?v=${videoId}`
