// ==UserScript==
// @name         YouTube - Open Playlist Video Outside Playlist
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  make video links inside all playlists (except excluded ones) open outside the playlist
// @copyright    2025, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.0.0

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-open-playlist-video-outside-playlist.user.js
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-open-playlist-video-outside-playlist.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Open_Playlist_Video_Outside_Playlist
// @homepage     https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Open_Playlist_Video_Outside_Playlist
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Open_Playlist_Video_Outside_Playlist.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/YouTube_-_Open_Playlist_Video_Outside_Playlist.user.js

// @match        https://www.youtube.com/playlist*
// @require      https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/refs/tags/onElementReady@0.10.0/utils/onElementReady.js
// ==/UserScript==

/* global onElementReady */

/**
 * remove all search params, except for "v", from `href` of element
 *
 * @param {HTMLElement} link - html node
 */
function updateLink(link) {
  if (link instanceof HTMLAnchorElement) {
    const url = new URL(link.href)
    const newParams = new URLSearchParams()

    for (const [key, value] of url.searchParams.entries()) {
      if (key === "v") {
        newParams.append(key, value)
      }
    }

    url.search = newParams.toString()
    link.href = url.toString()
  }
}

const GM_PLAYLISTS_KEY = "yt-excluded-playlist-ids"
let excludedPlaylistIds = GM_getValue(GM_PLAYLISTS_KEY, "")
const playlistId = new URLSearchParams(window.location.search).get("list")

if (playlistId && !excludedPlaylistIds.split(",").includes(playlistId)) {
  onElementReady("a[href]:is(#video-title, #thumbnail.ytd-thumbnail)", {}, updateLink)
}

GM_registerMenuCommand("Set Excluded YT Playlist IDs", () => {
  // eslint-disable-next-line no-alert
  const val = prompt(
    `input a comma separated list of playlist IDs to exclude (check the URL after "list=")`,
    excludedPlaylistIds,
  )

  if (val !== null) {
    excludedPlaylistIds = val
    GM_setValue(GM_PLAYLISTS_KEY, val)
  }
})
