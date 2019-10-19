// ==UserScript==
// @name         Piazza - Archive with Delete Key
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  bind the delete key to quickly archive posts
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.2.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/piazza-archive-with-delete-key.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Piazza_-_Archive_with_Delete_Key
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Piazza_-_Archive_with_Delete_Key/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Piazza_-_Archive_with_Delete_Key.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Piazza_-_Archive_with_Delete_Key.user.js

// @include      https://piazza.com/class/*
// ==/UserScript==
/* global P */

// TODO: add undo shortcut
// TODO: when switching to next convo, go up if previous movement was up

/**
 * ret prev item in cur week if exists or back up and move to prev week to get last item
 *
 * @param {Element} el - target
 * @returns {?HTMLElement} result
 */
const getPrevItem = (el) => {
	if (el.previousElementSibling) return /** @type {HTMLElement} */ (el.previousElementSibling)

	let parent = el.parentElement.parentElement.previousElementSibling
	while (parent) {
		if (parent.lastElementChild && parent.lastElementChild.lastElementChild) {
			return /** @type {HTMLElement} */ (parent.lastElementChild.lastElementChild)
		}
		parent = parent.previousElementSibling
	}

	return null
}

/**
 * ret next item in cur week if exists or back up and move to next week to get first item
 *
 * @param {Element} el - target
 * @returns {HTMLElement} result
 */
const getNextItem = (el) => {
	if (el.nextElementSibling) return /** @type {HTMLElement} */ (el.nextElementSibling)

	let parent = el.parentElement.parentElement.nextElementSibling
	while (parent) {
		if (parent.lastElementChild && parent.lastElementChild.lastElementChild) {
			return /** @type {HTMLElement} */ (parent.lastElementChild.lastElementChild)
		}
		parent = parent.nextElementSibling
	}

	return null
}

/**
 * navigate posts on key press
 *
 * @param {KeyboardEvent} e - keydown event
 */
const onKeydownHandler = (e) => {
	// move to prev feed item
	if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
		const prevItem = getPrevItem(document.querySelector('.feed_item.selected'))
		prevItem && prevItem.click()
	}

	// move to next feed item
	if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
		const nextItem = getNextItem(document.querySelector('.feed_item.selected'))
		nextItem && nextItem.click()
	}

	// del & move to next feed item
	if (e.key === 'Delete') {
		const nextItem = getNextItem(document.querySelector('.feed_item.selected'))
		nextItem && P.feed.delFeedItem(nextItem.id)
	}
}

document.addEventListener('keydown', onKeydownHandler)
