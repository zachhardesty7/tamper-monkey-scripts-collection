// ==UserScript==
// @name         YouTube - Filter Subscriptions Page
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  hide videos with given keywords in title on YouTube home and subscriptions pages
// @copyright    2019-2025, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.2.0

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-filter-subscriptions-page.user.js
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-filter-subscriptions-page.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page
// @homepage     https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Filter_Subscriptions_Page.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page.user.js

// @match        https://www.youtube.com/*
// @require      https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/refs/tags/onElementReady@0.10.0/utils/onElementReady.js
// ==/UserScript==

/* global onElementReady */

const HIDDEN_CLASSNAME = "zh-hidden"
const GM_FILTERS_KEY = "yt-filter-page"

/** for `youtube.com` home page */
const SELECTOR_HOME_PAGE = 'ytd-browse[page-subtype="home"]'
/** for `youtube.com/feed/subscriptions` page */
const SELECTOR_SUBS_PAGE = 'ytd-browse[page-subtype="subscriptions"]'

/** for grid view */
const SELECTOR_GRID_ITEM = "ytd-rich-item-renderer.ytd-rich-grid-renderer"
const SELECTOR_GRID_ITEM_TITLE = "a.yt-lockup-metadata-view-model__title"

/**
 * for list view
 *
 * @todo - incorrectly selects shorts
 */
const SELECTOR_LIST_ITEM = `ytd-item-section-renderer.ytd-section-list-renderer`
const SELECTOR_LIST_ITEM_TITLE = `#video-title yt-formatted-string`

let keywords = GM_getValue(GM_FILTERS_KEY, "")

const stylesheet = document.createElement("style")
const head = document.head || document.querySelectorAll("head")[0]
stylesheet.id = "hiding" // to edit later
stylesheet.type = "text/css"
stylesheet.append(
  document.createTextNode(`
  .zh-hidden {
    display: none !important;
  }
`),
)
head.append(stylesheet)

onElementReady(
  `:is(${SELECTOR_HOME_PAGE}, ${SELECTOR_SUBS_PAGE}) :is(${SELECTOR_GRID_ITEM}, ${SELECTOR_LIST_ITEM})`,
  { findOnce: false },
  (el) => {
    const videoTitle = el
      ?.querySelector(`:is(${SELECTOR_GRID_ITEM_TITLE}, ${SELECTOR_LIST_ITEM_TITLE})`)
      ?.textContent.toLowerCase()

    for (const keyword of keywords.toLowerCase().split(",")) {
      if (keyword && videoTitle?.includes(keyword)) {
        el.classList.add(HIDDEN_CLASSNAME)
        return
      }
    }

    el.classList.remove(HIDDEN_CLASSNAME)
  },
)

GM_registerMenuCommand("Set YT Filter Subscriptions Page Keywords", () => {
  // eslint-disable-next-line no-alert
  const val = prompt(
    "input a comma separated list of keywords (case insensitive)",
    keywords,
  )

  if (val !== null) {
    keywords = val
    GM_setValue(GM_FILTERS_KEY, val)
  }
})
