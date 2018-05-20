// ==UserScript==
// @name         Add Soundcloud External Download Button
// @namespace    http://zachhardesty.com
// @version      1.0
// @description  adds a button on main page and song page to download song automatically from https://soundcloudmp3.org/
// @author       Zach Hardesty
// @match        https://soundcloud.com/*
// @match        https://soundcloudmp3.org/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

/* eslint no-undef: "off" */

// adds button to soundcloud
// @args jNode node of most recently added children (for lazy load)
function addButton (jNode) {
  let link = window.location.href
  let button = document.createElement('button')
  button.textContent = 'External Download'
  // if on soundcloud home and song node is not a playlist, append SC styled button
  if (link.includes('stream') && !jNode[0].querySelector('.soundTitle__title').href.includes('/sets/')) {
    button.className = 'mp3-button sc-button sc-button-small'
    jNode[0].querySelector('.soundActions .sc-button-group').append(button)
    // add click listener to GM store the url of the song and open anything2mp3
    jNode[0].querySelector('.mp3-button').addEventListener('click', (e) => {
      GM_setValue('link', jNode[0].querySelector('.soundTitle__title').href)
      window.open('https://soundcloudmp3.org/', '_blank')
    })
    // else if on individual song page (and not playlist), append SC styled button
  } else if (!link.includes('stream') && (!link.includes('/sets/') || link.includes('?in='))) {
    let toolbar = document.querySelector('.soundActions div:first-child')
    button.className = 'mp3-button sc-button sc-button-medium'
    toolbar.append(button)
    // add click listener to GM store the url of the song and open anything2mp3
    document.querySelector('.mp3-button').addEventListener('click', (e) => {
      GM_setValue('link', link)
      window.open('https://soundcloudmp3.org/', '_blank')
    })
  }
}

// auto-run on soundcloudmp3
// if referred from soundcloud, grab data from GM storage
// paste and submit to begin conversion to mp3
(function () {
  if (!window.location.href.includes('soundcloudmp3') &&
        window.location.href.includes('soundcloud')) {
    // library that detects ajax changes
    // requires jQuery *sadface*
    waitForKeyElements('.l-listen-wrapper', addButton)
    waitForKeyElements('.lazyLoadingList__list > .soundList__item', addButton)
  } else if (window.location.href.includes('soundcloudmp3') &&
        document.referrer.includes('soundcloud') &&
        !window.location.href.includes('converter')) {
    let media = GM_getValue('link')
    document.querySelector('.form-control').value = media
    document.querySelector('#conversionForm div span button').click()
  } else if (window.location.href.includes('converter')) {
    // hide modal breaks download plus it goes away after the download is triggered
    // waitForKeyElements('.modal-footer button', document.querySelector(".modal-footer button").click());
    var timer = setInterval(function () {
      if (document.querySelector('#ready-group').className !== 'hidden') {
        document.querySelector('#download-btn').click()
        clearInterval(timer)
      }
    }, 100)
  }
})()
