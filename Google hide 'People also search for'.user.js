/* eslint-disable no-undef, no-console, max-len */

// ==UserScript==
// @name         Google hide "People also search for"
// @namespace    http://zachhardesty.com
// @version      1.0
// @description  hide the annoying popup below the search result you just clicked on when you return to the search page
// @author       Zach Hardesty
// @match        https://www.google.com/search*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// @args jNode node of most recently checked page
function hideSuggestions(jNode) {
  // remove text
  jNode.parent().children('div').children(':nth-child(3)').remove()
  // remove border
  jNode.remove()
}

// only operate once necessary element has loaded
waitForKeyElements('.exp-outline', hideSuggestions, true)
