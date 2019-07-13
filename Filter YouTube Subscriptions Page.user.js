/* global onElementReady */
/* cspell:disable pixelmon */

// ==UserScript==
// @name         Filter YouTube Subscriptions Page
// @namespace    https://zachhardesty.com
// @version      0.1.1
// @description  hide videos with given title keywords
// @author       Zach Hardesty
// @match        https://www.youtube.com/feed/subscriptions*
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/?*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==

const keywords = [
	'pixelmon',
	'binding of isaac',
	'dark souls',
	'darkest dungeon',
	'hot rod garage',
	'dirt every day',
	'roadkill',
	'standard chess',
	'no man\'s sky',
	'unboxing',
	'week to wicked',
	'engine masters',
	'hearthstone',
]

// only operate once necessary el has loaded
onElementReady('#dismissable.style-scope.ytd-grid-video-renderer', false, (el) => {
	// remove video
	keywords.forEach((keyword) => {
		if (el.querySelector('#details').querySelector('#meta').firstElementChild.textContent.toLowerCase().includes(keyword)) {
			el.parentElement.remove()
		}
	})
})
