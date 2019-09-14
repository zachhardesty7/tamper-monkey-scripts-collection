/* cspell:disable pixelmon */

// ==UserScript==
// @name         YouTube - Filter Subscriptions Page
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  hide videos with given title keywords
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      0.1.1

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-filter-subscriptions-page.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Filter_Subscriptions_Page/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Filter_Subscriptions_Page.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/YouTube_-_Filter_Subscriptions_Page.user.js

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
window.onElementReady('#dismissable.style-scope.ytd-grid-video-renderer', false, (el) => {
	// remove video
	keywords.forEach((keyword) => {
		if (el.querySelector('#details').querySelector('#meta').firstElementChild.textContent.toLowerCase().includes(keyword)) {
			el.parentElement.remove()
		}
	})
})
