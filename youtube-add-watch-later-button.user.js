// ==UserScript==
// @name         YouTube - Add Watch Later Button
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  reveals the save and report buttons and makes links right clickable
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.3.4

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-add-watch-later-button.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Add_Watch_Later_Button
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Add_Watch_Later_Button/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Add_Watch_Later_Button.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/YouTube_-_Add_Watch_Later_Button.user.js

// @include      https://www.youtube.com*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// ==/UserScript==
// prevent eslint from complaining when redefining private function queryForElements from gist
// eslint-disable-next-line no-unused-vars
/* global onElementReady, queryForElements:true */
/* eslint-disable no-underscore-dangle */

/**
 * Query for new DOM nodes matching a specified selector.
 *
 * @override
 */
// @ts-ignore
queryForElements = (selector, _, callback) => {
  // Search for elements by selector
  const elementList = document.querySelectorAll(selector) || []
  elementList.forEach((element) => callback(element))
}

/**
 * build the button el tediously but like the rest
 *
 * @param {HTMLElement} buttons - html node
 */
function addButton(buttons) {
  const zh = document.querySelectorAll("#zh-wl")
  // noop if button already present in correct place
  if (zh.length === 1 && zh[0].parentElement.id === "top-level-buttons") return

  // YT hydration of DOM can shift elements
  if (zh.length >= 1) {
    console.debug("watch later button(s) found in wrong place, fixing")
    zh.forEach((wl) => {
      if (wl.id !== "top-level-buttons") wl.remove()
    })
  }

  // normal action
  console.debug("no watch later button found, adding new button")
  /** @type {HTMLElement & { buttonRenderer: boolean, isIconButton?: boolean, styleActionButton?: boolean }} */
  // @ts-ignore
  const container = document.createElement("ytd-button-renderer")

  // needed for on click style
  container.style.color = "var(--yt-spec-icon-inactive)"
  container.setAttribute("style-action-button", "true")
  container.setAttribute("is-icon-button", "true")
  container.className = buttons.lastElementChild.className
  container.id = "zh-wl"
  buttons.append(container)

  const link = document.createElement("a")
  link.tabIndex = -1
  link.className =
    buttons.children[buttons.children.length - 2].firstElementChild.className
  container.append(link)

  const buttonContainer = document.createElement("yt-icon-button")
  buttonContainer.id = "button"
  buttonContainer.className =
    buttons.children[
      buttons.children.length - 2
    ].lastElementChild.firstElementChild.className
  link.append(buttonContainer)

  const icon = document.createElement("yt-icon")
  icon.className =
    buttons.children[
      buttons.children.length - 2
    ].lastElementChild.firstElementChild.firstElementChild.firstElementChild.className
  buttonContainer.firstElementChild.append(icon)

  buttonContainer.firstElementChild["aria-label"] = "Save to Watch Later"

  // copy icon from hovering video thumbnails
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("viewBox", "0 0 24 24")
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
  svg.setAttribute("focusable", "false")
  svg.setAttribute(
    "class",
    buttons.children[
      buttons.children.length - 2
    ].lastElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute(
      "class"
    )
  )
  svg.setAttribute(
    "style",
    "pointer-events: none; display: block; width: 100%; height: 100%;"
  )
  icon.append(svg)

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
  g.setAttribute(
    "class",
    buttons.children[
      buttons.children.length - 2
    ].lastElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute(
      "class"
    )
  )
  svg.append(g)

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute(
    "class",
    buttons.children[
      buttons.children.length - 2
    ].lastElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute(
      "class"
    )
  )
  path.setAttribute(
    "d",
    "M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z"
  )
  g.append(path)

  const text = document.createElement("yt-formatted-string")
  text.id = "text"
  link.append(text)
  text.className =
    buttons.children[
      buttons.children.length - 2
    ].lastElementChild.lastElementChild.className
  // needed to style on click
  text.style.color = "var(--yt-spec-text-secondary)"
  text.textContent = "later"

  // TODO: will be incorrect if already in WL
  // change to blue when added to WL
  container.addEventListener("click", () => {
    const flippedColorCon =
      container.style.color === "var(--yt-spec-icon-inactive)"
        ? "var(--yt-spec-call-to-action)"
        : "var(--yt-spec-icon-inactive)"
    container.style.color = flippedColorCon

    const flippedColorText =
      text.style.color === "var(--yt-spec-text-secondary)"
        ? "var(--yt-spec-call-to-action)"
        : "var(--yt-spec-text-secondary)"
    text.style.color = flippedColorText
  })

  const window = buttons.ownerDocument.defaultView // escape tampermonkey scope
  link.addEventListener("click", () => post(window)) // meat of the script
}

/**
 * initiate the data post
 *
 * @param {any} window - escape iFrame
 */
async function post(window) {
  // the 3 unique data points required, stored in strange places
  const {
    csn,
  } = window.ytInitialData.responseContext.webResponseContextExtensionData.ytConfigData
  const addedVideoId =
    window.ytInitialData.currentVideoEndpoint.watchEndpoint.videoId
  const token = window.ytcfg.data_.XSRF_TOKEN // location varies when minified build changes

  // // get exact playlist ID
  // document.querySelector('#top-level-buttons').children[3].click()
  // // wait until loaded
  // const playlists = await new Promise((resolve, reject) => {
  //   const intervalId = setInterval(() => {
  //     const el = document.querySelector('#playlists')
  //     const backdrop = document.querySelector('.opened')
  //     if (el
  //       && el.firstElementChild && el.firstElementChild.querySelector('#checkbox') && backdrop) {
  //       && el.firstElementChild.querySelector('#checkbox') && backdrop) {
  //       && backdrop
  //     ) {
  //       clearInterval(intervalId)
  //       resolve(el)
  //     }
  //   }, 100)
  // })

  // document.querySelector('.opened').click()
  // const playlist = playlists.firstElementChild.__data.data
  //   .addToPlaylistServiceEndpoint.playlistEditEndpoint.playlistId

  // encode the form as URI body, starts from an obj bc it's cleaner
  const body = new URLSearchParams({
    sej: JSON.stringify({
      clickTrackingParams: "HASTOBECERTAINLENGTHBUTCONTENTIRRELEVANT=",
      commandMetadata: {
        webCommandMetadata: {
          url: "/service_ajax",
          sendPost: true,
        },
      },
      playlistEditEndpoint: {
        playlistId: "WL",
        // playlistId: playlist, // still does not provide visual feedback
        actions: [
          {
            addedVideoId,
            action: "ACTION_ADD_VIDEO",
          },
        ],
      },
    }),
    csn,
    session_token: token,
  })

  // snagged from inspecting other WL post operations
  fetch("https://www.youtube.com/service_ajax?name=playlistEditEndpoint", {
    credentials: "include",
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      pragma: "no-cache",
    },
    referrerPolicy: "origin-when-cross-origin",
    body,
    method: "POST",
    mode: "cors",
  })
}

// YouTube uses a bunch of duplicate 'id' tag values. why?
// this makes it much more likely to target right one, but at the cost of being brittle
onElementReady(
  "#info #info-contents #menu #top-level-buttons",
  { findOnce: false },
  addButton
)
