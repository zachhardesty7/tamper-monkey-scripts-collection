/* global onElementReady */

// ==UserScript==
// @name        Etsy Ad Remover
// @namespace   https://zachhardesty.com/
// @description removes annoying and inconspicuous search ads from Etsy
// @include     https://www.etsy.com/search*
// @include     https://www.etsy.com/market/*
// @version     1.0.0
// @require     https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==

onElementReady('.ad-indicator', false, (el) => {
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
