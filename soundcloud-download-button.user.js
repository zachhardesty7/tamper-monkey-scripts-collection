// ==UserScript==
// @name         Soundcloud - Add External Download Button
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  adds a button on main page and song page to download song automatically from https://soundcloudmp3.org/
// @copyright    2019-2026, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.2.1

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/soundcloud-download-button.user.js
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/soundcloud-download-button.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Soundcloud_-_Add_External_Download_Button
// @homepage     https://openuserjs.org/scripts/zachhardesty7/Soundcloud_-_Add_External_Download_Button
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Soundcloud_-_Add_External_Download_Button.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/Soundcloud_-_Add_External_Download_Button.user.js

// @match        https://soundcloud.com/*
// @match        https://loader.to/*
// @require      https://update.greasyfork.org/scripts/419640/1776135/onElementReady.js
// ==/UserScript==

/* global onElementReady */

// #region - test page links (to add external download button to)
// song: https://soundcloud.com/user-342593999-672340495/the-quietude
// song (w/ existing download icon): https://soundcloud.com/neilcic/mouth-sounds
// profile (w/ sets, w/ & w/o existing download icon): https://soundcloud.com/noisia
// set: https://soundcloud.com/noisia/sets/the-resonance-vii
// feed: https://soundcloud.com/feed
// #endregion

const SELECTOR_SONG_LIST_ITEM = ".soundList__item"
// FIXME: triggers twice for some reason, but still seems to work fine
const SELECTOR_SONG_PAGE = ".listenEngagement__footer"

/**
 * adds button to soundcloud
 *
 * @param {HTMLElement} el - most recently added children (for lazy load)
 */
function addSoundcloudDownloadButton(el) {
  const link = window.location.href
  let songLink = link
  const button = document.createElement("button")
  button.textContent = "External Download"

  // if on soundcloud home feed and song node is not a playlist, append small SC styled button
  if (
    el.matches(SELECTOR_SONG_LIST_ITEM) &&
    !(
      /** @type {HTMLAnchorElement | null} */ (
        el.querySelector(".soundTitle__title")
      )?.href.includes("/sets/")
    )
  ) {
    button.className = "mp3-button sc-button sc-button-small"
    el.querySelector(".soundActions .sc-button-group")?.append(button)
    songLink =
      /** @type {HTMLAnchorElement | null} */ (el.querySelector(".soundTitle__title"))
        ?.href || link

    // else if on individual song page (and not playlist), append SC styled button
  } else if (
    el.matches(SELECTOR_SONG_PAGE) &&
    (!link.includes("/sets/") || link.includes("?in="))
  ) {
    const toolbar = document.querySelector(".soundActions div:first-child")
    button.className = "mp3-button sc-button sc-button-medium"
    toolbar?.append(button)
  }

  el.querySelector(".mp3-button")?.addEventListener("click", () => {
    window.open(`https://loader.to/?link=${songLink}&f=1&s=1&e=1&r=ddownr`, "_blank")
  })
}

function mp3() {
  const { href } = window.location
  if (href.includes("loader.to")) {
    // auto-run download when page loads soundcloud mp3
    onElementReady(
      "#ds .card .section:last-of-type > progress",
      { findOnce: false },
      (progress) => {
        const timer = setInterval(() => {
          if (!(progress instanceof HTMLProgressElement)) {
            clearInterval(timer)
            throw new TypeError("soundcloud-download-button: expected progress element")
          }

          if (progress.value === 1000) {
            /** @type {HTMLAnchorElement | null} */
            const button = document.querySelector("#ds .card .section:last-of-type > a")
            button?.click()
            clearInterval(timer)
          }
        }, 100)
      },
    )
  } else {
    onElementReady(
      `:is(${SELECTOR_SONG_LIST_ITEM}, ${SELECTOR_SONG_PAGE})`,
      { findOnce: true },
      addSoundcloudDownloadButton,
    )
  }
}

mp3()
