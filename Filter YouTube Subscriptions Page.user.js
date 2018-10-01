/* eslint-disable no-undef, no-console, max-len */

// ==UserScript==
// @name         Filter YouTube Subscriptions Page
// @namespace    http://zachhardesty.com
// @version      0.1.1
// @description  hide videos with given title keywords
// @author       Zach Hardesty
// @match        https://www.youtube.com/feed/subscriptions*
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/?*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

const keywords = [
  'binding of isaac',
  'dark souls',
  'darkest dungeon',
  'hot rod garage',
  'dirt every day',
  'roadkill',
  'standard chess',
  'no man\'s sky',
  'hearthstone'
]

// only operate once necessary element has loaded
waitForKeyElements('#dismissable.style-scope.ytd-grid-video-renderer', func, false)

// @args jNode node of most recently checked page
function func(jNode) {
  // remove video
  keywords.forEach((keyword) => {
    if (jNode[0].querySelector('#details').querySelector('#meta').firstElementChild.textContent.toLowerCase().includes(keyword)) {
      jNode[0].parentElement.remove()
    }
  })
}
