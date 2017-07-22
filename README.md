# Music app

Playground app for testing out different music APIs.

## Setup instructions

1. Clone / download the repo
3. Download FFmpeg (https://www.google.com/search?q=ffmpeg)
2. Navigate to the repo's root directory
4. Run `mkdir client/app/secrets`
5. Run `touch client/app/secrets/keys.js`
6. add your api keys to keys.js like so:  
  `export const YOUTUBE_API_KEY = **YOUR_KEY_GOES_HERE**`  
  `export const LAST_FM_API_KEY = **YOUR_KEY_GOES_HERE**`
7. Run `npm install`
8. Run `npm run webpack`
9. Run `npm start`
