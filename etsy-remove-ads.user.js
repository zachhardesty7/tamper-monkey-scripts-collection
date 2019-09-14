
// ==UserScript==
// @name        Etsy - Remove Ads
// @namespace   https://zachhardesty.com/
// @description removes annoying and inconspicuous search ads from Etsy
// @include     https://www.etsy.com/search*
// @include     https://www.etsy.com/market/*
// @version     1.0.0
// @require     https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// @license     GPL-3.0-only; https://www.gnu.org/licenses/gpl-3.0.en.html
// @copyright   2019, Zach Hardesty (https://zachhardesty.com/)
// ==/UserScript==

window.onElementReady('.ad-indicator', false, (el) => {
	el
		.parentElement
		.parentElement
		.parentElement
		.parentElement
		.parentElement
		.parentElement
		.parentElement
		.remove()
})
