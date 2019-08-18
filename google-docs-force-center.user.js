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

const $$ = (selector = '') => document.querySelector(selector)

function centerDocs() {
	setInterval(() => {
		const editorWidth = $$('.kix-appview-editor').scrollWidth
		const docWidth = $$('.kix-zoomdocumentplugin-outer').scrollWidth
		$$('.kix-zoomdocumentplugin-outer').style.left =
      `${(editorWidth / 2) - (docWidth / 2)}px`
	})
}
