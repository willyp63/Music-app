# Music app

Playground app for testing out different music APIs.

## Setup instructions

1. Clone / download the repo
3. Download FFmpeg (https://www.google.com/search?q=ffmpeg)  
  * This build pack works great for hosting on Heroku (https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest).
2. Navigate to the repo's root directory
4. Run `mkdir client/app/secrets`
5. Run `touch client/app/secrets/keys.js`
6. Get API keys for Youtube (https://www.google.com/search?q=youtube%20search%20api) and Last fm (https://www.google.com/search?q=last%20fm%20api).
7. add your api keys to keys.js like so:  
  `export const YOUTUBE_API_KEY = **YOUR_KEY_GOES_HERE**`  
  `export const LAST_FM_API_KEY = **YOUR_KEY_GOES_HERE**`
8. Run `npm install`
9. Run `npm run webpack`
10. Run `npm start`
