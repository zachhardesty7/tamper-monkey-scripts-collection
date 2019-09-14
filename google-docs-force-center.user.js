/* eslint-env browser, jquery, greasemonkey */
/* eslint-disable max-len */

// ==UserScript==
// @name         Google Docs - Force Center Document View
// @namespace    https://zachhardesty.com
// @version      0.1
// @description  force center align of page display on Google Docs
// @author       Zach Hardesty
// @match        https://docs.google.com/document/*
// @grant        none
// @license     GPL-3.0-only; https://www.gnu.org/licenses/gpl-3.0.en.html
// @copyright   2019, Zach Hardesty (https://zachhardesty.com/)
// ==/UserScript==

window.addEventListener('load', centerDocs, false)

function centerDocs() {
	document.querySelector('.kix-appview-editor').setAttribute('style', 'overflow-x: hidden')

	setInterval(() => {
		document.querySelector('.kix-appview-editor').scrollLeft =
      (document.querySelector('.kix-zoomdocumentplugin-outer').scrollWidth -
      document.querySelector('.kix-appview-editor').clientWidth) / 2
	}, 250)
}
