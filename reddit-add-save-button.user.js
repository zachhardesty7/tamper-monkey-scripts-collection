// ==UserScript==
// @name         Reddit - Add Save Button
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  adds a save button to all comments and posts everywhere
// @copyright    2024-2025, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.1.4

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/reddit-add-save-button.user.js
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/reddit-add-save-button.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Reddit_-_Add_Save_Button
// @homepage     https://openuserjs.org/scripts/zachhardesty7/Reddit_-_Add_Save_Button
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Reddit_-_Add_Save_Button.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/Reddit_-_Add_Save_Button.user.js

// @match        https://www.reddit.com/
// @match        https://www.reddit.com/user/*
// @match        https://www.reddit.com/r/*/comments/*
// @require      https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/refs/tags/onElementReady@0.10.0/utils/onElementReady.js
// ==/UserScript==

/* global onElementReady */

const ID_SAVE = "zh-save"

/**
 * @param {HTMLElement} overflowButton - triple dot more button under comments
 * @returns {HTMLButtonElement} save button
 */
function createSaveButton(overflowButton) {
  function toggleSaveButton() {
    const isSavedCurrent = svg.getAttribute("icon-name") === "save-fill"

    svg.setAttribute("icon-name", isSavedCurrent ? "save-outline" : "save-fill")
    path.setAttribute(
      "d",
      isSavedCurrent
        ? "M4.114 20A1.117 1.117 0 0 1 3 18.884V2.628A1.629 1.629 0 0 1 4.628 1h10.744A1.63 1.63 0 0 1 17 2.628v16.245a1.12 1.12 0 0 1-1.718.946L10 16.479l-5.291 3.346a1.11 1.11 0 0 1-.595.175Zm.514-17.75a.378.378 0 0 0-.378.378v16.009L10 15l5.75 3.636V2.628a.378.378 0 0 0-.378-.378H4.628Z"
        : "M15.372 1H4.628A1.629 1.629 0 0 0 3 2.628v16.256a1.113 1.113 0 0 0 1.709.941L10 16.479l5.282 3.34A1.12 1.12 0 0 0 17 18.873V2.628A1.63 1.63 0 0 0 15.372 1Z",
    )
    innerSpan2.textContent = isSavedCurrent ? "Save" : "Remove from saved"
  }

  const isSavedInitial = !!overflowButton.shadowRoot?.querySelector(
    "svg[icon-name='save-fill']",
  )

  const button = document.createElement("button")
  button.setAttribute("rpl", "")
  button.setAttribute(
    "class",
    "button border-md font-semibold text-12 button-plain-weak inline-flex items-center px-sm",
  )
  button.setAttribute(
    "style",
    "height: var(--size-button-sm-h); font: var(--font-button-sm)",
  )
  button.setAttribute("slot", "overflow")
  button.id = "zh-save"

  const span = document.createElement("span")
  span.setAttribute("class", "flex items-center")
  button.append(span)

  const innerSpan1 = document.createElement("span")
  innerSpan1.setAttribute("class", "flex text-16 mr-[var(--rem6)]")
  span.append(innerSpan1)

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("rpl", "")
  // svg.setAttribute("aria-hidden", "true")
  svg.setAttribute("fill", "currentColor")
  svg.setAttribute("height", "16")
  svg.setAttribute("icon-name", isSavedInitial ? "save-fill" : "save-outline")

  svg.setAttribute("viewBox", "0 0 20 20")
  svg.setAttribute("width", "16")
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
  innerSpan1.append(svg)

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute(
    "d",
    isSavedInitial
      ? "M15.372 1H4.628A1.629 1.629 0 0 0 3 2.628v16.256a1.113 1.113 0 0 0 1.709.941L10 16.479l5.282 3.34A1.12 1.12 0 0 0 17 18.873V2.628A1.63 1.63 0 0 0 15.372 1Z"
      : "M4.114 20A1.117 1.117 0 0 1 3 18.884V2.628A1.629 1.629 0 0 1 4.628 1h10.744A1.63 1.63 0 0 1 17 2.628v16.245a1.12 1.12 0 0 1-1.718.946L10 16.479l-5.291 3.346a1.11 1.11 0 0 1-.595.175Zm.514-17.75a.378.378 0 0 0-.378.378v16.009L10 15l5.75 3.636V2.628a.378.378 0 0 0-.378-.378H4.628Z",
  )
  svg.append(path)

  const innerSpan2 = document.createElement("span")
  innerSpan2.textContent = isSavedInitial ? "Remove from saved" : "Save"
  span.append(innerSpan2)

  // const screenReaderContent = document.createElement("faceplate-screen-reader-content")
  // screenReaderContent.textContent = " save "
  // button.append(screenReaderContent)

  const overflowSaveButton = overflowButton.shadowRoot?.querySelector(
    ".save-comment-menu-button > div",
  )

  if (overflowSaveButton) {
    overflowSaveButton.addEventListener("click", () => {
      toggleSaveButton()
    })
    button.addEventListener("click", () => {
      overflowSaveButton.click()
    })
  } else {
    // comments on posts have no hacks to see if the shadow DOM is loaded, so we have to attach a new listener to watch the shadow DOM for changes before attaching the click listeners and checking the save status
    onElementReady(
      ".save-comment-menu-button > div",
      { root: overflowButton.shadowRoot, findFirst: true },
      (overflowSaveButtonShadow) => {
        overflowSaveButtonShadow.addEventListener("click", () => {
          toggleSaveButton()
        })

        button.addEventListener("click", () => {
          overflowSaveButtonShadow.click()
        })

        // fix incorrect button style set in first pass due to it not finding the svg in the shadow DOM
        if (overflowButton.shadowRoot?.querySelector("svg[icon-name='save-fill']")) {
          toggleSaveButton()
        }
      },
    )
  }

  return button
}

/**
 * @param {HTMLElement} overflowButton - triple dot more button
 * @returns {HTMLButtonElement} save button
 */
function createPostSaveButton(overflowButton) {
  function toggleSaveButton() {
    const isSavedCurrent = svg.getAttribute("icon-name") === "save-fill"

    svg.setAttribute("icon-name", isSavedCurrent ? "save-outline" : "save-fill")
    path.setAttribute(
      "d",
      isSavedCurrent
        ? "M4.114 20A1.117 1.117 0 0 1 3 18.884V2.628A1.629 1.629 0 0 1 4.628 1h10.744A1.63 1.63 0 0 1 17 2.628v16.245a1.12 1.12 0 0 1-1.718.946L10 16.479l-5.291 3.346a1.11 1.11 0 0 1-.595.175Zm.514-17.75a.378.378 0 0 0-.378.378v16.009L10 15l5.75 3.636V2.628a.378.378 0 0 0-.378-.378H4.628Z"
        : "M15.372 1H4.628A1.629 1.629 0 0 0 3 2.628v16.256a1.113 1.113 0 0 0 1.709.941L10 16.479l5.282 3.34A1.12 1.12 0 0 0 17 18.873V2.628A1.63 1.63 0 0 0 15.372 1Z",
    )
    innerSpan2.textContent = isSavedCurrent ? "Save" : "Remove from saved"
  }

  const overflowSaveButton = overflowButton.shadowRoot?.querySelector(
    // buttons don't have any class names, so `:has` is used to find the correct button via the icon
    "faceplate-menu > li:has(svg[icon-name*='save']) > div",
  )

  if (!overflowSaveButton) {
    throw new Error(
      "cannot find post's overflow menu save/unsave button, shadow DOM likely not loaded",
    )
  }

  const isSavedInitial = !!overflowButton.shadowRoot?.querySelector(
    "svg[icon-name='save-fill']",
  )

  const button = document.createElement("button")
  button.setAttribute("rpl", "")
  button.setAttribute(
    "class",
    "button border-md overflow-visible flex flex-row justify-center items-center h-xl font-semibold relative text-12 button-secondary inline-flex items-center px-sm",
  )
  button.setAttribute(
    "style",
    "height: var(--size-button-sm-h); font: var(--font-button-sm)",
  )
  button.setAttribute("type", "button")
  button.id = "zh-save"
  button.addEventListener("click", (event) => {
    overflowSaveButton.click()
  })

  const span = document.createElement("span")
  span.setAttribute("class", "flex items-center")
  button.append(span)

  const innerSpan1 = document.createElement("span")
  innerSpan1.setAttribute("class", "flex text-16 mr-[var(--rem6)]")
  span.append(innerSpan1)

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("rpl", "")
  svg.setAttribute("aria-hidden", "true")
  svg.setAttribute("fill", "currentColor")
  svg.setAttribute("height", "16")
  svg.setAttribute("icon-name", isSavedInitial ? "save-fill" : "save-outline")

  svg.setAttribute("viewBox", "0 0 20 20")
  svg.setAttribute("width", "16")
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
  innerSpan1.append(svg)

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute(
    "d",
    isSavedInitial
      ? "M15.372 1H4.628A1.629 1.629 0 0 0 3 2.628v16.256a1.113 1.113 0 0 0 1.709.941L10 16.479l5.282 3.34A1.12 1.12 0 0 0 17 18.873V2.628A1.63 1.63 0 0 0 15.372 1Z"
      : "M4.114 20A1.117 1.117 0 0 1 3 18.884V2.628A1.629 1.629 0 0 1 4.628 1h10.744A1.63 1.63 0 0 1 17 2.628v16.245a1.12 1.12 0 0 1-1.718.946L10 16.479l-5.291 3.346a1.11 1.11 0 0 1-.595.175Zm.514-17.75a.378.378 0 0 0-.378.378v16.009L10 15l5.75 3.636V2.628a.378.378 0 0 0-.378-.378H4.628Z",
  )
  svg.append(path)

  const innerSpan2 = document.createElement("span")
  innerSpan2.textContent = isSavedInitial ? "Remove from saved" : "Save"
  span.append(innerSpan2)

  // TODO: add screen reader content
  // const screenReaderContent = document.createElement("faceplate-screen-reader-content")
  // screenReaderContent.textContent = " save "
  // button.append(screenReaderContent)

  overflowSaveButton.addEventListener("click", () => {
    toggleSaveButton()
  })

  return button
}

/**
 * add features to comments
 *
 * @param {HTMLElement} overflowButton - triple dot more button under comments
 */
function improveComments(overflowButton) {
  const zh = overflowButton.parentElement?.querySelectorAll(`#${ID_SAVE}`)
  // noop if button already present in correct place
  if (zh?.length === 1 && zh[0].parentElement?.getAttribute("slot") === "actionRow") {
    return
  }

  const saveButton = createSaveButton(overflowButton)

  overflowButton.before(saveButton)
}

/**
 * add saved button to all posts (saved, feed, comments)
 *
 * @param {HTMLElement} overflowButton - triple dot more button
 */
function addPostSaveButton(overflowButton) {
  const post = overflowButton.closest("shreddit-post")
  const zh = post?.shadowRoot?.querySelectorAll(`#${ID_SAVE}`)

  // noop if button already present in correct place
  if (
    zh?.length === 1 &&
    zh[0].parentElement?.classList.contains("shreddit-post-container")
  ) {
    return
  }

  const saveButton = createPostSaveButton(overflowButton)

  post?.shadowRoot
    ?.querySelector(".shreddit-post-container slot[name='share-button']")
    ?.after(saveButton)
}

window.addEventListener(
  "load",
  () => {
    // comments
    onElementReady(
      // `[item-state]` needed to ensure saved comments have been fully loaded (first per batch may be missing shadow dom temporarily)
      // direct child selector used for post comments to ensure each comment in tree is independently selected
      ":where(shreddit-profile-comment[item-state], shreddit-comment > div[slot='actionRow'] > shreddit-comment-action-row) shreddit-overflow-menu[slot='overflow'][source='comment']",
      { findOnce: false },
      improveComments,
    )

    // posts (saved, feed, comments)
    onElementReady(
      // `[item-state]` needed to ensure items have been fully loaded (first per batch may be missing shadow dom temporarily)
      // REVIEW: should this target the action bar for loading instead? would make some logic simpler
      "shreddit-post-overflow-menu[item-state]",
      { findOnce: false },
      addPostSaveButton,
    )
  },
  false,
)
