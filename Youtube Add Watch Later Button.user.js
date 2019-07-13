/* global onElementReady */
/* eslint-disable no-underscore-dangle */
/* cspell:disable ytcfg */

// ==UserScript==
// @name        YouTube Add Watch Later Button
// @namespace   https://zachhardesty.com/
// @description reveals the save and report buttons and makes links right clickable
// @include     https://www.youtube.com/watch*
// @version     1.0.1
// @require     https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/

// ==/UserScript==

/**
 * build the button el tediously but like the rest
 *
 * TODO: add user feedback
 *
 * @param {HTMLCollection} buttons - html node
 */
function addButton(buttons) {
	const container = document.createElement('ytd-button-renderer')
	container.buttonRenderer = true
	container.style.color = 'var(--yt-spec-icon-inactive)'
	container.className = buttons.lastElementChild.className
	buttons.appendChild(container)

	const link = document.createElement('a')
	link.className = buttons.children[buttons.children.length - 2].firstElementChild.className
	container.append(link)

	// button container automatically builds the 'button' el... maybe?
	const buttonContainer = document.createElement('yt-icon-button')
	buttonContainer.id = 'button'
	buttonContainer.className = buttons.children[buttons.children.length - 2]
		.lastElementChild.firstElementChild.className
	link.append(buttonContainer)

	const icon = document.createElement('yt-icon')
	icon.className = buttons.children[buttons.children.length - 2].lastElementChild.firstElementChild
		.firstElementChild.firstElementChild.className
	buttonContainer.lastElementChild.append(icon)

	// copy icon from hovering video thumbnails
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	svg.setAttribute('viewBox', '0 0 24 24')
	svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
	svg.setAttribute('focusable', 'false')
	svg.setAttribute('class', buttons.children[buttons.children.length - 2].lastElementChild.firstElementChild
		.firstElementChild.firstElementChild.firstElementChild.className.baseVal)
	svg.setAttribute('style', 'pointer-events: none; display: block; width: 100%; height: 100%;')
	icon.append(svg)

	const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
	g.setAttribute('class', buttons.children[buttons.children.length - 2].lastElementChild.firstElementChild
		.firstElementChild.firstElementChild.firstElementChild.firstElementChild.className.baseVal)
	svg.append(g)

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
	path.setAttribute('class', buttons.children[buttons.children.length - 2].lastElementChild.firstElementChild.firstElementChild
		.firstElementChild.firstElementChild.firstElementChild.firstElementChild.className.baseVal)
	path.setAttribute('d', 'M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z')
	g.append(path)

	const text = document.createElement('yt-formatted-string')
	text.id = 'text'
	text.className = buttons.children[buttons.children.length - 2]
		.lastElementChild.lastElementChild.className
	link.append(text)
	text.style.color = 'var(--yt-spec-text-secondary)'
	text.textContent = 'later'

	const window = buttons.ownerDocument.defaultView // escape tampermonkey scope
	link.addEventListener('click', () => { post(window) }) // meat of the script
}

/**
 * initiate the data post
 *
 * @param {Window} window - global object
 */
async function post(window) {
	// the 3 unique data points required, stored in strange places
	const { csn } = window.ytInitialData.responseContext.webResponseContextExtensionData.ytConfigData
	const addedVideoId = window.ytInitialData.currentVideoEndpoint.watchEndpoint.videoId
	const token = window.ytcfg.data_.XSRF_TOKEN // location varies when minified build changes

	// // get exact playlist ID
	// document.querySelector('#top-level-buttons').children[3].click()
	// // wait until loaded
	// const playlists = await new Promise((resolve, reject) => {
	//   const intervalId = setInterval(() => {
	//     const el = document.querySelector('#playlists')
	//     const backdrop = document.querySelector('.opened')
	//     if (el
	//       && el.firstElementChild && el.firstElementChild.querySelector('#checkbox') && backdrop) {
	//       && el.firstElementChild.querySelector('#checkbox') && backdrop) {
	//       && backdrop
	//     ) {
	//       clearInterval(intervalId)
	//       resolve(el)
	//     }
	//   }, 100)
	// })

	// document.querySelector('.opened').click()
	// const playlist = playlists.firstElementChild.__data.data
	//   .addToPlaylistServiceEndpoint.playlistEditEndpoint.playlistId

	// encode the form as URI body, starts from an obj bc it's cleaner
	const body = new URLSearchParams({
		sej: JSON.stringify({
			clickTrackingParams: 'HASTOBECERTAINLENGTHBUTCONTENTIRRELEVANT=',
			commandMetadata: {
				webCommandMetadata: {
					url: '/service_ajax',
					sendPost: true,
				},
			},
			playlistEditEndpoint: {
				playlistId: 'WL',
				// playlistId: playlist, // still does not provide visual feedback
				actions: [{
					addedVideoId,
					action: 'ACTION_ADD_VIDEO',
				}],
			},
		}),
		csn,
		session_token: token,
	})

	// snagged from inspecting other WL post operations
	fetch('https://www.youtube.com/service_ajax?name=playlistEditEndpoint', {
		credentials: 'include',
		headers: {
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9',
			'cache-control': 'no-cache',
			'content-type': 'application/x-www-form-urlencoded',
			pragma: 'no-cache',
		},
		referrerPolicy: 'origin-when-cross-origin',
		body,
		method: 'POST',
		mode: 'cors',
	})
}

// YouTube uses a bunch of duplicate 'id' tag values. why?
// this makes it much more likely to target right one, but at the cost of being brittle
onElementReady('#info #info-contents #menu #top-level-buttons', false, addButton)
