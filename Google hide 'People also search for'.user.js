/* global onElementReady */

// ==UserScript==
// @name         Google hide "People also search for"
// @namespace    https://zachhardesty.com
// @version      1.0.0
// @description  hide the annoying popup below the search result you just clicked on when you return to the search page
// @author       Zach Hardesty
// @match        https://www.google.com/search*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==

// @args el node of most recently checked page
function hideSuggestions(el) {
  // remove text
  el.parentElement.querySelector('div').querySelector(':nth-child(3)').remove()
  // remove border
  el.remove()
}

// only operate once necessary element has loaded
onElementReady('.exp-outline', true, hideSuggestions)
