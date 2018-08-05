// ==UserScript==
// @name         Filter YouTube Subscriptions Page
// @namespace    http://zachhardesty.com
// @version      0.1.0
// @description  hide videos with given title keywords
// @author       Zach Hardesty
// @match        https://www.youtube.com/feed/subscriptions*
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/?*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

/* eslint no-undef: "off" */

const keywords = [
  'binding of isaac',
  'dark souls',
  'darkest dungeon',
  'hot rod garage',
  'dirt every day',
  'roadkill',
  'standard chess',
  'hearthstone'
]

function main () {
  // only opperate once necessary element has loaded
  // waitForKeyElements('.feed-item-container.browse-list-item-container.yt-section-hover-container .feed-item-dismissable .multirow-shelf .shelf-content', func, true)

  waitForKeyElements('.yt-shelf-grid-item', func, false)
}

// @args jNode node of most recently checked page
function func (jNode) {
  // remove video
  for (const keyword of keywords) {
    if (jNode[0].firstElementChild.firstElementChild.lastElementChild.firstElementChild.textContent.toLowerCase().includes(keyword)) {
      jNode[0].remove()
    }
  }
}

(function () {
  main()
})()
