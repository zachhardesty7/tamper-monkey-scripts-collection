/* global onElementReady */

// ==UserScript==
// @name        Reddit Improve Saved Comments
// @namespace   https://zachhardesty.com/
// @description reveals the save and report buttons and makes links right clickable
// @include     https://www.reddit.com/user/*/saved/*
// @version     1.0.0
// @require     https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==

/**
 * sometimes you really need access to react internals to fix somebody
 * else's broken app and add no-brainer features
 *
 * @param {Element} DOMNode - arbitrary DOM node with a hidden react instance
 * @returns {{}} react instance object
 */
const getReactInstance = DOMNode => DOMNode[Object.keys(DOMNode)[0]]

/**
 * add features to comments
 *
 * @param {HTMLCollection} buttons - set of buttons under comments
 */
function improveComments(buttons) {
	const moreButton = buttons.querySelector('button:nth-child(4)')
	const moreComponent = getReactInstance(moreButton)

	const report = document.createElement('button')
	report.textContent = 'Report'
	report.className = buttons.children[0].className
	report.onclick = moreComponent.return.return.memoizedProps.children[0].props.onClick

	// does not dynamically update text content
	const save = document.createElement('button')
	save.textContent = 'Save / Unsave'
	save.className = buttons.children[0].className
	save.onclick = moreComponent.return.return.memoizedProps.children[1].props.onClick

	// TODO: might have more items in the dropdown
	moreButton.remove()
	buttons.appendChild(report)
	buttons.appendChild(save)

	// not defined in a separate function just because this is a quick
	// way to ensure that all of the important parts are loaded
	const comment = buttons.parentElement.parentElement.parentElement
		.parentElement.parentElement.parentElement.parentElement

	// wrap the entirety of the comment
	const container = comment.parentElement
	const wrapper = document.createElement('a')
	wrapper.href = getReactInstance(comment).return.memoizedProps.comment.permalink
	wrapper.append(comment) // move all original DOM children
	wrapper.onclick = e => e.preventDefault() // allow original click handler to take over

	container.append(wrapper)
}

// gross, but Reddit uses styled-components / emotion and has almost no
// constant selectors that don't change between renders
onElementReady('div.Comment > div > div > div:last-child > div > div:nth-child(2) > div:nth-child(2) > div:last-child', false, improveComments)
