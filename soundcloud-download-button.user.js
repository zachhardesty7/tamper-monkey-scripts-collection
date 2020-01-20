/* cspell:disable soundcloudmp */

// ==UserScript==
// @name         Soundcloud - Add External Download Button
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  adds a button on main page and song page to download song automatically from https://soundcloudmp3.org/
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.0.1

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/soundcloud-download-button.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Soundcloud_-_Add_External_Download_Button
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Soundcloud_-_Add_External_Download_Button/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Soundcloud_-_Add_External_Download_Button.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Soundcloud_-_Add_External_Download_Button.user.js

// @match        https://soundcloud.com/*
// @match        https://loader.to/*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
/* global onElementReady */

/**
 * adds button to soundcloud
 *
 * @param {HTMLElement} el - most recently added children (for lazy load)
 */
function addButton(el) {
  const link = window.location.href
  const button = document.createElement('button')
  button.textContent = 'External Download'
  // if on soundcloud home and song node is not a playlist, append SC styled button

  if (link.includes('stream') && !(/** @type {HTMLAnchorElement} */(el.querySelector('.soundTitle__title')).href.includes('/sets/'))) {
    button.className = 'mp3-button sc-button sc-button-small'
    el.querySelector('.soundActions .sc-button-group').append(button)
    // add click listener to GM store the url of the song and open anything2mp3
    el.querySelector('.mp3-button').addEventListener('click', (e) => {
      window.open(`https://loader.to/?link=${link}&f=1&s=1&e=1&r=ddownr`, '_blank')
    })
    // else if on individual song page (and not playlist), append SC styled button
  } else if (!link.includes('stream') && (!link.includes('/sets/') || link.includes('?in='))) {
    const toolbar = document.querySelector('.soundActions div:first-child')
    button.className = 'mp3-button sc-button sc-button-medium'
    toolbar.append(button)
    // add click listener to GM store the url of the song and open anything2mp3
    document.querySelector('.mp3-button').addEventListener('click', (e) => {
      window.GM_setValue('link', link)
      window.open(`https://loader.to/?link=${link}&f=1&s=1&e=1&r=ddownr`, '_blank')
    })
  }
}

// auto-run on soundcloud mp3
// if referred from soundcloud, grab data from GM storage
// paste and submit to begin conversion to mp3
(function mp3() {
  if (!window.location.href.includes('loader.to') &&
        window.location.href.includes('soundcloud')) {
    // library that detects ajax changes
    // requires jQuery - boo
    onElementReady('.l-listen-wrapper', false, addButton)
    onElementReady('.lazyLoadingList__list > .soundList__item', false, addButton)
  } else if (window.location.href.includes('loader.to')) {
    // hide modal breaks download plus it goes away after the download is triggered
    // onElementReady('.modal-footer button', false,
    //   document.querySelector(".modal-footer button").click());
    const timer = setInterval(() => {
      /** @type {HTMLProgressElement} */
      const progress = document.querySelector('#ds .card .section:last-of-type > progress')
      if (progress.value === 1000) {
        /** @type {HTMLLinkElement} */
        const button = document.querySelector('#ds .card .section:last-of-type > a')
        button.click()
        clearInterval(timer)
      }
    }, 100)
  }
})()
