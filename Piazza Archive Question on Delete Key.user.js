/* eslint-env browser, jquery, greasemonkey */
/* global P */

// ==UserScript==
// @name        Piazza Bind Delete Key to Archive
// @namespace   https://zachhardesty.com/
// @description bind the delete key to quickly archive posts
// @include     https://piazza.com/class/*
// @version     1.0.0
// ==/UserScript==

// FIXME: doesn't work on first element?

(function f() {
  // curried function to call on delete press event listener
  // calls function as if archive dropdown menu item was pressed
  const archiveItem = archive => (e) => {
    if (e.key === 'Delete') P.feed.feedItemDropdownMenuCallback(archive)
  }

  // set all initial event listeners
  const setListeners = () => {
    const els = document.querySelectorAll('.feed_item')
    els.forEach((el, i) => {
      const archive = el.querySelector('.feed_item_dropdown_selector .archive_action').onclick

      el.tabIndex = '0'
      el.addEventListener('keydown', archiveItem(archive))
      el.addEventListener('click', resetListeners(i))
    })
  }

  // curried function to call on click event listener
  // pass through target element index and run
  // interval until the tabIndex of the updated element is set
  const resetListeners = i => () => {
    const ensureIndex = setInterval(() => {
      const els = document.querySelectorAll('.feed_item')
      els.forEach((el) => { el.tabIndex = '0' })
      const el = els[i]

      if (el.tabIndex === 0) {
        const archive = el.querySelector('.feed_item_dropdown_selector .archive_action')

        el.removeEventListener('keydown', archiveItem(archive))
        el.addEventListener('keydown', archiveItem(archive))
        el.addEventListener('click', resetListeners(i))
        el.focus()

        clearInterval(ensureIndex)
      }
    }, 100)
  }

  // establish initial listeners
  setListeners()
})()
