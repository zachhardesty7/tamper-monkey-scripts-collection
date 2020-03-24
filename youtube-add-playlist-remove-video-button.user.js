/* eslint-disable no-underscore-dangle */
/* cspell:disable ytcfg */

// ==UserScript==
// @name         YouTube - Add Playlist Remove Video Button
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  adds a remove button next to each video on each playlist page
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-add-watch-later-button.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Add_Playlist_Remove_Video_Button
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Add_Playlist_Remove_Video_Button/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Add_Playlist_Remove_Video_Button.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/YouTube_-_Add_Playlist_Remove_Video_Button.user.js

// @include      https://www.youtube.com/playlist?list=*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==
// prevent eslint from complaining when redefining private function queryForElements from gist
// eslint-disable-next-line no-unused-vars
/* global onElementReady, queryForElements:true */

/**
 * Query for new DOM nodes matching a specified selector.
 *
 * @override
 */
queryForElements = (selector, callback) => {
  // search for elements by selector
  const elementList = document.querySelectorAll(selector) || []
  elementList.forEach((element) => callback(element))
}

/**
 * build the button el tediously but like the rest
 *
 * @param {HTMLElement} buttons - html node
 */
function addButton(buttons) {
  // remove automatically generated dom items
  // TODO: can be simplified to use instead of deleting
  while (buttons.lastElementChild && buttons.lastElementChild.children.length > 1) {
    buttons.lastElementChild.firstElementChild.remove()
    while (buttons.lastElementChild.firstElementChild.lastElementChild.children.length > 1) {
      buttons.lastElementChild.firstElementChild.lastElementChild.lastElementChild.remove()
    }
  }

  // noop if button already present in correct place or button node is detached from doc
  if (buttons.children.length === 2) return
  if (!buttons || !buttons.firstElementChild ||
    !buttons.parentElement.parentElement.parentElement) return

  // normal action
  console.debug('no watch later button found, adding new button')
  const container = document.createElement('ytd-menu-renderer')

  container.className = buttons.firstElementChild.className
  buttons.appendChild(container)

  const buttonContainer = document.createElement('yt-icon-button')
  buttonContainer.id = 'button'
  buttonContainer.className = buttons.firstElementChild.firstElementChild.className
  container.append(buttonContainer)

  // wrapping button field automatically created
  const icon = document.createElement('yt-icon')
  icon.className = buttons.firstElementChild.firstElementChild
    .firstElementChild.firstElementChild.className
  buttonContainer.firstElementChild.append(icon)

  // copy icon from triple dot menu
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svg.setAttribute('focusable', 'false')
  svg.setAttribute('class',
    buttons.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute('class'))
  svg.setAttribute('style', 'pointer-events: none; display: block; width: 100%; height: 100%;')
  icon.append(svg)

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  g.setAttribute('class', buttons.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute('class'))
  svg.append(g)

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('class', buttons.firstElementChild.firstElementChild.firstElementChild
    .firstElementChild.getAttribute('class'))
  path.setAttribute('d', 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z')
  g.append(path)

  const window = buttons.ownerDocument.defaultView // escape tampermonkey scope
  const videoIndex = Array.from(buttons.parentElement.parentElement.parentElement.children)
    .indexOf(buttons.parentElement.parentElement)

  const { setVideoId } = window.ytInitialData.contents
    .twoColumnBrowseResultsRenderer
    .tabs[0].tabRenderer.content.sectionListRenderer.contents[0]
    .itemSectionRenderer.contents[0].playlistVideoListRenderer
    .contents[videoIndex].playlistVideoRenderer

  // TODO: update following item numbers in playlist
  buttonContainer.addEventListener('click', () => {
    buttons.parentElement.parentElement.remove()
    buttons.parentElement.remove()
    buttons.remove()
    post(window, setVideoId) // meat of the script
  })
}

/**
 * initiate the data post
 *
 * @param {any} window - escape iFrame
 * @param {string} setVideoId - video id
 */
async function post(window, setVideoId) {
  // the 3 unique data points required, stored in strange places
  const { csn } = window.ytInitialData.responseContext.webResponseContextExtensionData.ytConfigData
  const token = window.ytcfg.data_.XSRF_TOKEN // location varies when minified build changes
  const playlistId = (new URLSearchParams(window.location.search)).get('list')

  // encode the form as URI body, starts from an obj bc it's cleaner
  const body = new URLSearchParams({
    sej: JSON.stringify({
      clickTrackingParams: 'HASTOBECERTAINLENGTHBUTCONTENTIRRELEVANT=',
      commandMetadata: {
        webCommandMetadata: {
          url: '/service_ajax',
          sendPost: true,
          apiUrl: '/youtubei/v1/browse/edit_playlist',
        },
      },
      playlistEditEndpoint: {
        playlistId,
        actions: [{
          setVideoId,
          action: 'ACTION_REMOVE_VIDEO',
        }],
        params: 'CAE%3D',
        clientActions: [{ playlistRemoveVideosAction: { setVideoIds: [setVideoId] } }],
      },
    }),
    csn,
    session_token: token,
  })

  // snagged from inspecting other playlist post operations
  fetch('https://www.youtube.com/service_ajax?name=playlistEditEndpoint', {
    credentials: 'include',
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded',
      pragma: 'no-cache',
    },
    referrerPolicy: 'origin-when-cross-origin',
    body,
    method: 'POST',
    mode: 'cors',
  })
}

// YouTube uses a bunch of duplicate 'id' tag values. why?
// this makes it much more likely to target right one, but at the cost of being brittle
onElementReady('.ytd-playlist-video-list-renderer #content.ytd-playlist-video-renderer #menu.ytd-playlist-video-renderer ', false, addButton)
