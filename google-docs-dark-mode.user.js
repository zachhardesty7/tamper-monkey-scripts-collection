/* global googleDocsUtil */
/* cspell:disable goog */

// ==UserScript==
// @name         Google Docs - Dark Mode (BROKEN)
// @namespace    https://zachhardesty.com
// @version      0.0.0
// @description  best dark mode out there!
// @author       Zach Hardesty
// @match        https://docs.google.com/document/*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// @grant        none
// @license     GPL-3.0-only; https://www.gnu.org/licenses/gpl-3.0.en.html
// @copyright   2019, Zach Hardesty (https://zachhardesty.com/)
// ==/UserScript==

// strikingly complex (uses DOM bounding boxes) to get currently selected text:
// may implement only necessary functions to save space, library size: (15.4 KB)
// https://github.com/JensPLarsen/ChromeExtension-GoogleDocsUtil

// document.addEventListener('DOMContentLoaded', setDark, false)

// setInterval(setDark, 1000)

(function setDark() {
	console.log('darkening')
	document.querySelector('#kix-appview > div.kix-appview-editor-container > div > div:nth-child(1) > div.kix-zoomdocumentplugin-outer > div > div > div > div:nth-child(2) > div').style['background-color'] = 'rgb(26, 26, 26)'

	const css = `
html { background-color: rgb(26, 26, 26) !important; }
.kix-cursor-caret { border-color: white !important; }
body { background-color: rgb(26, 26, 26) !important; }
.kix-page.kix-page-paginated { background-color: rgb(26, 26, 26) !important; }
.kix-page-content-wrapper { background-color: rgb(26, 26, 26) !important; }
.docs-ui-unprintable { background-color: rgb(26, 26, 26) !important; }
.goog-inline-block.kix-lineview-text-block { color: rgb(191, 191, 191) !important; }
span .kix-wordhtmlgenerator-word-node { color: rgb(191, 191, 191) !important; }
.kix-wordhtmlgenerator-word-node { color: rgb(191, 191, 191) !important; }
    `
	const style = document.createElement('style')
	const head = document.head || document.getElementsByTagName('head')[0]

	style.id = 'dark' // to edit later
	style.type = 'text/css'
	if (style.styleSheet) {
		// This is required for IE8 and below.
		style.styleSheet.cssText = css
	} else {
		style.appendChild(document.createTextNode(css))
	}

	head.appendChild(style)
})()

/**
 * padd the end of a string with zeroes
 *
 * @param {string} str - arbitrary input
 * @param {number} len - total length of result
 * @returns {string} input with padding
 */
function padZero(str, len) {
	const newLen = len || 2
	const zeros = new Array(newLen).join('0')
	return (zeros + str).slice(-newLen)
}

/**
 * invert the color of a hex code string
 *
 * @param {string} hex - hex code to invert
 * @param {boolean} bw - restrict to black and white
 * @returns {string} inverted hex code
 */
function invertColor(hex, bw) {
	let newHex = hex
	if (newHex.indexOf('#') === 0) {
		newHex = newHex.slice(1)
	}
	// convert 3-digit hex to 6-digits.
	if (newHex.length === 3) {
		newHex = newHex[0] + newHex[0] + newHex[1] + newHex[1] + newHex[2] + newHex[2]
	}
	if (newHex.length !== 6) {
		throw new Error('Invalid HEX color.')
	}
	let r = parseInt(newHex.slice(0, 2), 16)

	let g = parseInt(newHex.slice(2, 4), 16)

	let b = parseInt(newHex.slice(4, 6), 16)
	if (bw) {
		// http://stackoverflow.com/a/3943023/112731
		return (r * 0.299 + g * 0.587 + b * 0.114) > 186
			? '#000000'
			: '#FFFFFF'
	}
	// invert color components
	r = (255 - r).toString(16)
	g = (255 - g).toString(16)
	b = (255 - b).toString(16)
	// pad each with zeros and return
	return `#${padZero(r)}${padZero(g)}${padZero(b)}`
}
