// ==UserScript==
// @name         YouTube - Add Watch Later Button
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  adds a new button next to like that quick adds / removes the active video from your "Watch later" playlist
// @copyright    2019-2021, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.4.3

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-add-watch-later-button.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Add_Watch_Later_Button
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Add_Watch_Later_Button.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/YouTube_-_Add_Watch_Later_Button.user.js

// @include      https://www.youtube.com/watch*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// ==/UserScript==
// prevent eslint from complaining when redefining private function queryForElements from gist
// eslint-disable-next-line no-unused-vars
/* global onElementReady, queryForElements:true */
/* eslint-disable no-underscore-dangle */

const BUTTONS_CONTAINER_ID = "top-level-buttons-computed"
const ACTIVE_STYLE = "var(--yt-spec-call-to-action)"
const INACTIVE_BUTTON_STYLE = "var(--yt-spec-icon-inactive)"
const INACTIVE_TEXT_STYLE = "var(--yt-spec-text-secondary)"

/**
 * Query for new DOM nodes matching a specified selector.
 *
 * @override
 */
// @ts-ignore
queryForElements = (selector, _, callback) => {
  // Search for elements by selector
  const elementList = document.querySelectorAll(selector) || []
  for (const element of elementList) callback(element)
}

/**
 * build the button el tediously but like the rest
 *
 * @param {HTMLElement} buttons - html node
 */
function addButton(buttons) {
  const zh = document.querySelectorAll("#zh-wl")
  // noop if button already present in correct place
  if (zh.length === 1 && zh[0].parentElement.id === BUTTONS_CONTAINER_ID) return

  // YT hydration of DOM can shift elements
  if (zh.length >= 1) {
    console.debug("watch later button(s) found in wrong place, fixing")
    for (const wl of zh) {
      if (wl.id !== BUTTONS_CONTAINER_ID) wl.remove()
    }
  }

  // normal action
  console.debug("no watch later button found, adding new button")
  const playlistSaveButton = document.querySelector(
    "#top-level-buttons-computed > ytd-button-renderer:nth-child(4)"
  )

  // needed to force the node to load so we can determine if it's already in WL or not
  playlistSaveButton.click()
  playlistSaveButton.click()

  /**
   * @typedef {HTMLElement & { buttonRenderer: boolean, isIconButton?: boolean, styleActionButton?: boolean }} ytdButtonRenderer
   */
  const container = /** @type {ytdButtonRenderer} */ (
    document.createElement("ytd-button-renderer")
  )

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
  text.style.color = INACTIVE_TEXT_STYLE
  text.textContent = "later"

  let hasListener = false
  onElementReady(
    "#playlists .ytd-add-to-playlist-renderer #checkbox",
    { findOnce: false },
    (checkbox) => {
      if (!hasListener && checkbox.textContent.trim() === "Watch later") {
        hasListener = true
        console.debug("no click listener, adding new click listener")
        const watchLaterCheckbox = /** @type {HTMLInputElement} */ (checkbox)

        container.style.color = watchLaterCheckbox?.checked
          ? ACTIVE_STYLE
          : INACTIVE_BUTTON_STYLE
        text.style.color = watchLaterCheckbox?.checked
          ? ACTIVE_STYLE
          : INACTIVE_TEXT_STYLE

        container.addEventListener("click", () => {
          watchLaterCheckbox?.click()

          container.style.color = watchLaterCheckbox?.checked
            ? ACTIVE_STYLE
            : INACTIVE_BUTTON_STYLE
          text.style.color = watchLaterCheckbox?.checked
            ? ACTIVE_STYLE
            : INACTIVE_TEXT_STYLE
        })
      }
    }
  )
}

// YouTube uses a bunch of duplicate 'id' tag values. why?
// this makes it much more likely to target right one, but at the cost of being brittle
onElementReady(
  `#info #info-contents #menu #${BUTTONS_CONTAINER_ID}`,
  { findOnce: false },
  addButton
)
