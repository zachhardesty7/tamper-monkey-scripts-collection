/* eslint-disable no-undef */

// ==UserScript==
// @name        YouTube Add Watch Later Button
// @namespace   https://zachhardesty.com/
// @description reveals the save and report buttons and makes links right clickable
// @include     https://www.youtube.com/watch*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js

// ==/UserScript==

/**
 * build the button element tediously but like the rest
 *
 * @TODO add user feedback
 * @param {*} jNode jquery node
 */
function addButton(jNode) {
  const buttons = jNode[0]

  const container = document.createElement('ytd-button-renderer')
  container.buttonRenderer = true
  container.style.color = 'var(--yt-spec-icon-inactive)'
  container.className = buttons.lastElementChild.className

  const link = document.createElement('a')
  link.className = buttons.lastElementChild.firstElementChild.className
  container.append(link)
  const window = buttons.ownerDocument.defaultView // escape tampermonkey scope
  link.onclick = () => post(window) // meat of the script

  // button container automatically builds the 'button' element
  const buttonContainer = document.createElement('yt-icon-button')
  buttonContainer.className = buttons.lastElementChild.lastElementChild.firstElementChild.className
  buttonContainer.id = 'button'
  link.append(buttonContainer)

  const icon = document.createElement('yt-icon')
  icon.id = 'button'
  icon.className = buttons.lastElementChild.lastElementChild.firstElementChild
    .firstElementChild.firstElementChild.className
  buttonContainer.firstElementChild.append(icon)

  // copy icon from hovering video thumbnails
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svg.setAttribute('focusable', 'false')
  svg.setAttribute('className', buttons.lastElementChild.lastElementChild.firstElementChild
    .firstElementChild.firstElementChild.firstElementChild)
  svg.setAttribute('style', 'pointer-events: none; display: block; width: 100%; height: 100%;')
  icon.append(svg)

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  g.setAttribute('className', buttons.lastElementChild.lastElementChild.firstElementChild
    .firstElementChild.firstElementChild.firstElementChild.firstElementChild)
  svg.append(g)

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('className', buttons.lastElementChild.lastElementChild.firstElementChild
    .firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild)
  path.setAttribute('d', 'M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z')
  g.append(path)

  const text = document.createElement('yt-formatted-string')
  text.id = 'text'
  text.className = buttons.lastElementChild.lastElementChild.lastElementChild.className
  text.textContent = 'later'
  link.append(text)

  buttons.appendChild(container)
}

/**
 * initiate the data post
 *
 * @param {*} window
 */
function post(window) {
  // the 3 unique data points required, stored in strange places
  const { csn } = window.ytInitialData.responseContext.webResponseContextExtensionData.ytConfigData
  const addedVideoId = window.ytInitialData.currentVideoEndpoint.watchEndpoint.videoId
  const token = window._yt_player.wp.XSRF_TOKEN // eslint-disable-line no-underscore-dangle

  // encode the form as URI body, starts from an obj bc it's cleaner
  const body = new URLSearchParams({
    sej: JSON.stringify({
      clickTrackingParams: 'HASTOBECERTAINLENGTHBUTCONTENTIRRELEVANT=',
      commandMetadata: {
        webCommandMetadata: {
          url: '/service_ajax',
          sendPost: true
        }
      },
      playlistEditEndpoint: {
        playlistId: 'WL',
        actions: [{
          addedVideoId,
          action: 'ACTION_ADD_VIDEO'
        }]
      }
    }),
    csn,
    session_token: token
  })

  // snagged from inspecting other WL post operations
  fetch('https://www.youtube.com/service_ajax?name=playlistEditEndpoint', {
    credentials: 'include',
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded',
      pragma: 'no-cache'
    },
    referrerPolicy: 'origin-when-cross-origin',
    body,
    method: 'POST',
    mode: 'cors'
  })
}

// YouTube uses a bunch of duplicate 'id' tag values. why?
waitForKeyElements('#info #info-contents #menu #top-level-buttons', addButton)
