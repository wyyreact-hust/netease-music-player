# Netease Music Player

This project is a highly imitation of Netease Music Player based on React, TypeScript and Next.js. 

## Table of Contents

- [Install](#Install)
- [Function List](#Function)
## Install

1. First, use git clone to download the project:

   ```bash
   https://github.com/wyyreact-hust/netease-music-player.git
   ```

2. Preparation for API:
[Netease Music Player API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)
[A node.js server build with express and graphql](https://github.com/uniquemo/express-graphql-server)

3. The project uses node, npm and yarn, go check them out if you don'St have them locally installed.

   ```bash
   # yarn
   winget install yarn.yarn
   # npm
   npm install
   ```

4. Run server:

   ```bash
   # cd to the content of first api, run
   node app.js
   # cd to the contene of second api, run
   yarn start:local
   ```

5. Visit in browser:

## Function

- [x] Search
  - [x] Search with popular keywords
  - [x] Suggestions
  - [x] Search Results page
- [x] Music playback details page
  - [x] Comments
  - [x] Lyrics
  - [x] Music list