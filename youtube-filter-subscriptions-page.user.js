// ==UserScript==
// @name         YouTube - Filter Subscriptions Page
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  hide videos with given title keywords
// @copyright    2019-2021, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.0.2

// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-filter-subscriptions-page.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Filter_Subscriptions_Page.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page.user.js

// @match        https://www.youtube.com*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// ==/UserScript==
/* global onElementReady */

const HIDDEN_CLASSNAME = "zh-hidden"
const DEFAULT_KEYWORDS = [
  "pixelmon",
  "dark souls",
  "darkest dungeon",
  "hot rod garage",
  "dirt every day",
  "roadkill",
  "standard chess",
  "no man's sky",
  "unboxing",
  "week to wicked",
  "engine masters",
  "hearthstone",
].join(",")

let keywords = GM_getValue("yt-filter-page", DEFAULT_KEYWORDS)

const stylesheet = document.createElement("style")
const head = document.head || document.querySelectorAll("head")[0]
stylesheet.id = "hiding" // to edit later
stylesheet.type = "text/css"
stylesheet.append(
  document.createTextNode(`
  .zh-hidden {
    display: none !important;
  }
`)
)
head.append(stylesheet)

// runs on youtube.com/feed/subscriptions
onElementReady(
  "#dismissible.style-scope.ytd-grid-video-renderer",
  { findOnce: false },
  (el) => {
    const videoTitle = el
      .querySelector("#details #meta")
      .firstElementChild.textContent.toLowerCase()
    const parentContainer = el.parentElement

    for (const keyword of keywords.split(",")) {
      if (videoTitle.includes(keyword)) {
        parentContainer.classList.add(HIDDEN_CLASSNAME)
        return
      }
    }

    parentContainer.classList.remove(HIDDEN_CLASSNAME)
  }
)

// runs on youtube.com
onElementReady(
  "#dismissible.style-scope.ytd-rich-grid-media",
  { findOnce: false },
  (el) => {
    const videoTitle = el
      .querySelector("#details #meta")
      .firstElementChild.textContent.toLowerCase()
    const parentContainer = el.parentElement.parentElement.parentElement

    for (const keyword of keywords.split(",")) {
      if (videoTitle.includes(keyword)) {
        parentContainer.classList.add(HIDDEN_CLASSNAME)
        return
      }
    }

    parentContainer.classList.remove(HIDDEN_CLASSNAME)
  }
)

GM_registerMenuCommand("Set YT Filter Subscriptions Page Keywords", () => {
  // eslint-disable-next-line no-alert
  const val = prompt(
    "input a comma separated list of keywords (you can delete the keywords already here)",
    keywords
  )

  keywords = val
  GM_setValue("yt-filter-page", val)
})
