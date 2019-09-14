
// ==UserScript==
// @name         Google Search - Hide "People also search for"
// @namespace    https://zachhardesty.com
// @version      1.0.0
// @description  hide annoying popup below most recently visited the search result
// @author       Zach Hardesty
// @match        https://www.google.com/search*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// @license     GPL-3.0-only; https://www.gnu.org/licenses/gpl-3.0.en.html
// @copyright   2019, Zach Hardesty (https://zachhardesty.com/)
// ==/UserScript==

// only operate once necessary el has loaded
window.onElementReady('.exp-outline', true, (el) => {
	// remove text
	el.parentElement.querySelector('div').querySelector(':nth-child(3)').remove()
	// remove border
	el.remove()
})
