// ==UserScript==
// @name         Reddit - Improve Saved Comments
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  reveals the save and report buttons and makes links right clickable
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.2.2

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/reddit-improve-saved-comments.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Reddit_-_Improve_Saved_Comments
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Reddit_-_Improve_Saved_Comments/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Reddit_-_Improve_Saved_Comments.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Reddit_-_Improve_Saved_Comments.user.js

// @include      https://www.reddit.com/user/*/saved/*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// ==/UserScript==
/* global onElementReady */

/**
 * sometimes you really need access to react internals to fix somebody
 * else's broken app and add no-brainer features
 *
 * @param {HTMLElement} DOMNode - arbitrary DOM node with a hidden react instance
 * @returns {object} react instance object
 */
const getReactInstance = (DOMNode) => DOMNode[Object.keys(DOMNode)[0]]

/**
 * add features to comments
 *
 * @param {HTMLElement} button - triple dot more button under comments
 */
function improveComments(button) {
  const moreComponent = getReactInstance(button)
  const moreComponentProps = moreComponent.return.return.memoizedProps
  const genericButtonClass = button.parentElement.children[0].className

  const reportButton = document.createElement("button")
  reportButton.textContent = "Report"
  reportButton.className = genericButtonClass
  // navigate react obj
  reportButton.addEventListener(
    "click",
    moreComponentProps.children[0].props.onClick
  )

  // does not dynamically update text content
  const saveButton = document.createElement("button")
  saveButton.textContent = "Save / Unsave"
  saveButton.className = genericButtonClass
  saveButton.addEventListener(
    "click",
    moreComponentProps.children[1].props.onClick
  )

  // not defined in a separate function just because this is a quick
  // way to ensure that all of the important parts are loaded
  const comment =
    button.parentElement.parentElement.parentElement.parentElement.parentElement
      .parentElement.parentElement.parentElement

  // wrap the entirety of the comment in link el
  const container = comment.parentElement
  const wrapper = document.createElement("a")
  // link to comment page hidden in react instance
  wrapper.href =
    getReactInstance(comment).return.memoizedProps.comment.permalink
  wrapper.append(comment) // move all original DOM children
  wrapper.addEventListener("click", (e) => e.preventDefault()) // allow original click handler to take over

  container.append(wrapper)

  button.parentElement.append(reportButton)
  button.parentElement.append(saveButton)
  button.remove()
}
// gross, but Reddit uses styled-components / emotion and has almost no
// constant selectors that don't change between renders, detail allows react to hydrate first
window.addEventListener(
  "load",
  () => {
    onElementReady(
      "div.Comment > div > div > div:last-child > div > div:nth-child(2) > div:nth-child(2) > div:last-child > button:last-child[aria-haspopup][aria-expanded][aria-label]",
      { findOnce: false },
      improveComments
    )
  },
  false
)
