// ==UserScript==
// @name         Github - Inactive Development Warning
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  display big banner if project's last commit over 6 months ago and giant banner if over 1 year ago
// @copyright    2019-2021, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.3.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/github-inactive-dev-warning.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Github_-_Inactive_Development_Warning
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Github_-_Inactive_Development_Warning/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Github_-_Inactive_Development_Warning.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Github_-_Inactive_Development_Warning.user.js

// @match        https://github.com/*/*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// ==/UserScript==
/* global onElementReady */

onElementReady(
  ".repository-content .Box-header .js-details-container.Details relative-time",
  { findOnce: false },
  (el) => {
    if (document.querySelector("#zh-banner-warning")) return

    // @ts-ignore
    const date = new Date(el.attributes.datetime.value)
    const daysSinceLastCommit =
      (Date.now() - date.getTime()) / 1000 / 60 / 60 / 24
    if (daysSinceLastCommit > 365) {
      renderWarning()
    } else if (daysSinceLastCommit > 182.5) {
      renderCaution()
    } else {
      /* noop */
    }
  }
)

/**
 * @param {HTMLElement} el - target
 */
function displayMessage(el) {
  document
    .querySelector("#js-repo-pjax-container")
    .insertAdjacentElement("beforebegin", el)
}

function renderWarning() {
  const banner = document.createElement("div")
  banner.id = "zh-banner-warning"
  banner.setAttribute(
    "style",
    `
    background-color: red;
    height: 100px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 36px;
  `
  )

  banner.textContent = "WARNING: repo hasn't received an update in 1+ year(s)"

  displayMessage(banner)
}

function renderCaution() {
  const banner = document.createElement("div")
  banner.id = "zh-banner-warning"
  banner.setAttribute(
    "style",
    `
    background-color: yellow;
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  `
  )

  banner.textContent = "Caution: repo hasn't received an update in 6+ months"

  displayMessage(banner)
}
