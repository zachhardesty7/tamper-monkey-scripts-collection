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
// ==/UserScript==

window.addEventListener('load', centerDocs, false)

function centerDocs() {
	document.querySelector('.kix-appview-editor').style = 'overflow-x: hidden'

	setInterval(() => {
		document.querySelector('.kix-appview-editor').scrollLeft =
      (document.querySelector('.kix-zoomdocumentplugin-outer').scrollWidth -
      document.querySelector('.kix-appview-editor').clientWidth) / 2
	}, 250)
}
