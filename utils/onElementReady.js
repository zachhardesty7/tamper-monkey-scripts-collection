// ==UserScript==
// @name         Library: onElementReady ES7
// @namespace    zachhardesty
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/utils/onElementReady.js
// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/utils/onElementReady.js
// @version      0.10.1
// @description  Detect any new DOM Element by its CSS Selector, then trigger a function. Includes Promise- & Callback interface. Based on ES6 MutationObserver. Ships legacy waitForKeyElements interface, too.
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @icon         https://i.imgur.com/nmbtzlX.png
// @match        *://*/*
// ==/UserScript==

// Remember already found elements via this attribute
const QUERIED_ATTRIBUTE_NAME = "was-queried"

const DEFAULT_OPTIONS = /** @type {const} @satisfies {OnElementReadyOptions} */ ({
  findFirst: false,
  findOnce: true,
  root: document,
})

/**
 * Internal function used by {@link onElementReady} to query for new DOM nodes matching a
 * specified selector.
 *
 * @private
 * @param {string} selector
 * @param {OnElementReadyOptions} options
 * @param {OnElementReadyCallback} callback
 */
// eslint-disable-next-line prefer-const
let queryForElements = (selector, options, callback) => {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options }

  // Search for elements by selector
  const elementList = finalOptions.root?.querySelectorAll(selector) || []
  for (const element of elementList) {
    if (element.hasAttribute(QUERIED_ATTRIBUTE_NAME)) {
      continue
    }

    element.setAttribute(QUERIED_ATTRIBUTE_NAME, "true")
    callback(element)

    // run reset after 2 seconds
    if (!finalOptions.findOnce) {
      setTimeout(() => {
        element.removeAttribute(QUERIED_ATTRIBUTE_NAME)
      }, 2000)
    }
  }
}

/**
 * Wait for elements with a given CSS selector to enter the DOM. Returns a `Promise`
 * resolving with found/changed element and triggers a callback for every found/changed
 * element.
 *
 * @param {string} selector
 * @param {OnElementReadyOptions} [options]
 * @param {OnElementReadyCallback} [callback]
 * @returns {OnElementReadyReturn}
 * @public
 */
// eslint-disable-next-line prefer-const
let onElementReady = (selector, options = DEFAULT_OPTIONS, callback = () => {}) => {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options }

  return new Promise((resolve) => {
    // Initial Query
    queryForElements(selector, finalOptions, (element) => {
      resolve(element)
      callback(element)
    })

    // Continuous Query
    const observer = new MutationObserver(() => {
      // DOM Changes detected
      queryForElements(selector, finalOptions, (element) => {
        resolve(element)
        callback(element)

        // stop querying after first successful pass and remove mutation observer,
        // calling multiple times (when mutliple matching elements) seems to work fine
        if (finalOptions.findFirst) {
          observer.disconnect()
        }
      })
    })

    // Observe DOM Changes
    observer.observe(document.documentElement, {
      attributes: false,
      childList: true,
      subtree: true,
    })
  })
}

/**
 * @deprecated
 * @param {string} selector
 * @param {OnElementReadyCallback} [callback]
 * @param {OnElementReadyOptions} [options]
 * @returns {OnElementReadyReturn}
 * @public
 */
// eslint-disable-next-line no-unused-vars, prefer-const
let waitForKeyElements = (selector, callback, options) =>
  onElementReady(selector, options, callback)
