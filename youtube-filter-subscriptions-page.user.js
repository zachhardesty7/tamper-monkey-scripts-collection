// ==UserScript==
// @name         YouTube - Filter Subscriptions Page
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  hide videos with given title keywords
// @copyright    2019-2021, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-filter-subscriptions-page.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Filter_Subscriptions_Page.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/YouTube_-_Filter_Subscriptions_Page.user.js

// @match        https://www.youtube.com/feed/subscriptions*
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/?*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// ==/UserScript==
/* global onElementReady */

const keywords = [
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
]

// runs on youtube.com/feed/subscriptions
onElementReady(
  "#dismissible.style-scope.ytd-grid-video-renderer",
  { findOnce: false },
  (el) => {
    // remove video
    for (const keyword of keywords) {
      if (
        el
          .querySelector("#details #meta")
          .firstElementChild.textContent.toLowerCase()
          .includes(keyword)
      ) {
        el.parentElement.remove()
      }
    }
  }
)

// runs on youtube.com
onElementReady(
  "#dismissible.style-scope.ytd-rich-grid-media",
  { findOnce: false },
  (el) => {
    // remove video
    for (const keyword of keywords) {
      if (
        el
          .querySelector("#details #meta")
          .firstElementChild.textContent.toLowerCase()
          .includes(keyword)
      ) {
        el.parentElement.parentElement.parentElement.remove()
      }
    }
  }
)
