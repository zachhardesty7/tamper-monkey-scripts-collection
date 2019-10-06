
// ==UserScript==
// @name         Google Search - Hide "People also search for"
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  hide annoying popup below most recently visited the search result
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/google-hide-search-interruptions.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Google_Search_-_Hide_People_also_search_for
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Google_Search_-_Hide_People_also_search_for/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Google_Search_-_Hide_People_also_search_for.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Google_Search_-_Hide_People_also_search_for.user.js

// @match        https://www.google.com/search*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==
/* global onElementReady */

// only operate once necessary el has loaded
onElementReady('.exp-outline', true, (el) => {
	// remove text
	el.parentElement.querySelector('div').querySelector(':nth-child(3)').remove()
	el.remove() // remove border
})
