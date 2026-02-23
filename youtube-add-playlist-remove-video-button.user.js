// ==UserScript==
// @name         YouTube - Add Playlist Remove Video Button
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  adds a remove button next to each video on each playlist page
// @copyright    2019-2026, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.0.4

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-add-watch-later-button.user.js
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-add-watch-later-button.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Add_Playlist_Remove_Video_Button
// @homepage     https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Add_Playlist_Remove_Video_Button
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Add_Playlist_Remove_Video_Button.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/YouTube_-_Add_Playlist_Remove_Video_Button.user.js

// @match        https://www.youtube.com/*
// @require      https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/refs/tags/onElementReady@0.10.1/utils/onElementReady.js
// ==/UserScript==

// prevent eslint from complaining when redefining private function queryForElements from gist
// eslint-disable-next-line no-unused-vars
/* global onElementReady, queryForElements:true */

const STYLE_SCOPE = "style-scope"
const YT_ICON = "yt-icon"
const ZH_MARKER = "zh-delete-button"

// alternate: overflow menu > item (that has child string with child span string)
// "tp-yt-paper-listbox#items > ytd-menu-service-item-renderer:has(yt-formatted-string span.yt-formatted-string)"
// alternate: overflow menu > item (that has child "delete" icon)
// "tp-yt-paper-listbox#items > ytd-menu-service-item-renderer:has(yt-icon path[d='M19 3h-4V2a1 1 0 00-1-1h-4a1 1 0 00-1 1v1H5a2 2 0 00-2 2h18a2 2 0 00-2-2ZM6 19V7H4v12a4 4 0 004 4h8a4 4 0 004-4V7h-2v12a2 2 0 01-2 2H8a2 2 0 01-2-2Zm4-11a1 1 0 00-1 1v8a1 1 0 102 0V9a1 1 0 00-1-1Zm4 0a1 1 0 00-1 1v8a1 1 0 002 0V9a1 1 0 00-1-1Z'])"
/**
 * overflow menu > item (that has child string with exactly 2 children ('Remove from' &
 * playlist name))
 */
const OVERFLOW_MENU_POPUP_REMOVE_BUTTON_SELECTOR =
  "tp-yt-paper-listbox#items > ytd-menu-service-item-renderer:has(yt-formatted-string :nth-child(2):nth-last-child(1))"

/**
 * build the button el tediously but like the rest
 *
 * @param {HTMLElement} buttons - html node
 */
function addPlaylistVideoDeleteButton(buttons) {
  // noop if button already present
  if (buttons.querySelector(`.${ZH_MARKER}`)) {
    return
  }

  // normal action
  const container = document.createElement("div")

  container.id = "menu"
  container.className = `${STYLE_SCOPE} ytd-playlist-video-renderer ${ZH_MARKER}`
  buttons.append(container)

  const buttonContainer = document.createElement("yt-icon-button")
  buttonContainer.id = "button"
  buttonContainer.className = `dropdown-trigger ${STYLE_SCOPE} ytd-menu-renderer`
  container.append(buttonContainer)

  // wrapping button field automatically created
  const icon = document.createElement(YT_ICON)
  icon.className = `${STYLE_SCOPE} ytd-menu-renderer`
  buttonContainer.firstElementChild?.append(icon)

  // copy icon from triple dot menu
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("viewBox", "0 0 24 24")
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
  svg.setAttribute("focusable", "false")
  svg.setAttribute("class", `${STYLE_SCOPE} ${YT_ICON}`)
  svg.setAttribute(
    "style",
    "pointer-events: none; display: block; width: 100%; height: 100%;",
  )
  icon.append(svg)

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
  g.setAttribute("class", `${STYLE_SCOPE} ${YT_ICON}`)
  svg.append(g)

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("class", `${STYLE_SCOPE} ${YT_ICON}`)
  path.setAttribute(
    "d",
    "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  )
  g.append(path)

  buttonContainer.addEventListener("click", () => {
    const overflowMenuPopupRemoveButton = document.querySelector(
      OVERFLOW_MENU_POPUP_REMOVE_BUTTON_SELECTOR,
    )

    const overflowMenuButton = buttons.querySelector(`#menu:not(.${ZH_MARKER}) #button`)

    overflowMenuButton?.click()

    if (overflowMenuPopupRemoveButton) {
      // Schedule click on next tick to allow the overflow menu click to finish updating
      // the handlers on its menu items (otherwise the click will do nothing or error).
      // We don't use `setTimeout` because it doesn't trigger before the next repaint,
      // which would cause a flash of the menu on the screen.
      requestAnimationFrame(() => {
        overflowMenuPopupRemoveButton.click()
      })

      return
    }

    // allow the menu to be created before clicking (usually too quick to see)
    onElementReady(
      OVERFLOW_MENU_POPUP_REMOVE_BUTTON_SELECTOR,
      { findOnce: false, findFirst: true },
      (menuButton) => {
        menuButton.click()
      },
    )
  })
}

// YouTube uses a bunch of duplicate 'id' tag values. why?
// this makes it much more likely to target right one, but at the cost of being brittle
onElementReady(
  "ytd-playlist-video-list-renderer ytd-playlist-video-renderer.ytd-playlist-video-list-renderer",
  { findOnce: true },
  addPlaylistVideoDeleteButton,
)
