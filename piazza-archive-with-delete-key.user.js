/* global P onElementReady */

// ==UserScript==
// @name        Piazza - Archive with Delete Key
// @namespace   https://zachhardesty.com/
// @description bind the delete key to quickly archive posts
// @include     https://piazza.com/class/*
// @version     1.0.0
// @require     https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==

// FIXME: can sometimes archive the wrong post if other keys are pressed before delete

onElementReady('.feed_item', false, (el) => {
	// curried function to call on delete press event listener
	// calls function as if archive dropdown menu item was pressed
	const archiveItem = archive => (e) => {
		if (e.key === 'Delete') P.feed.feedItemDropdownMenuCallback(archive)
	}

	// set all initial event listeners
	const setListeners = (item) => {
		const archive = item.querySelector('.feed_item_dropdown_selector .archive_action').onclick

		item.tabIndex = '0' // eslint-disable-line no-param-reassign
		item.addEventListener('keydown', archiveItem(archive))
		item.addEventListener('click', resetListeners(i))
	}

	// curried function to call on click event listener
	// pass through target el index and run
	// interval until the tabIndex of the updated el is set
	const resetListeners = i => () => {
		const ensureIndex = setInterval(() => {
			const items = document.querySelectorAll('.feed_item')
			items.forEach((n) => { n.tabIndex = '0' }) // eslint-disable-line no-param-reassign
			const item = items[i]

			if (item.tabIndex === 0 || item.tabIndex === '0') {
				const archive = item.querySelector('.feed_item_dropdown_selector .archive_action')

				item.removeEventListener('keydown', archiveItem(archive))
				item.addEventListener('keydown', archiveItem(archive))
				item.addEventListener('click', resetListeners(i))
				item.focus()

				clearInterval(ensureIndex)
			}
		}, 100)
	}

	// find the index of the current item
	let i = 0
	document.querySelectorAll('.feed_item').forEach((el2, k) => {
		if (el2.id === el.id) i = k
	})

	setListeners(el)
})
