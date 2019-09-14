/* eslint-disable no-undef */
/* cspell:disable lunchdrop */

// ==UserScript==
// @name        Lunchdrop - Giftcards
// @namespace   https://zachhardesty.com/
// @description test lunchdrop sec
// @include     https://lunchdrop.com/app/gift-cards*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js

// @license     GPL-3.0-only; https://www.gnu.org/licenses/gpl-3.0.en.html
// @copyright   2019, Zach Hardesty (https://zachhardesty.com/)
// ==/UserScript==

/**
 *
 */
function genCode() {
	return Math.random().toString(36).replace('0.', '').substring('1')
}

/**
 *
 */
function sendCode(jNode) {
	const el = document.querySelector('.tab-pane.active .gift-card-sender')
	const field = el.querySelector('.form-control.input-lg')
	const button = el.querySelector('.btn')

	if (el && field && button) {
		field.value = genCode()
	}
}

// document.addEventListener('load', () => setTimeout(sendCode, 3000))
const css = `
  [style].alert-modal,
  [style].modal-backdrop {
    display: none !important;
  }
`
// waitForKeyElements('.gift-card-sender', () => setTimeout(sendCode, 3000))
/**
 *
 */
function t(jNode) {
	jNode[0].querySelector('li:nth-child(2) a').click()
	const style = document.createElement('style')
	const head = document.head || document.getElementsByTagName('head')[0]
	style.type = 'text/css'
	if (style.styleSheet) {
		// IE8 and below
		style.styleSheet.cssText = css
	} else {
		style.appendChild(document.createTextNode(css))
	}
	head.appendChild(style)
	setInterval(sendCode, 2000)
}
waitForKeyElements('.nav.nav-tabs', t)

/**
 *
 */
function x(jNode) {
	console.log(jNode[0].textContent)
}
waitForKeyElements('.modal-body', x)
