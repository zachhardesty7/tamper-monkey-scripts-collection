// ==UserScript==
// @name         IBM Verse - Auto-Select Next Email
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  load up next email when the current one is deleted
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/verse-ibm-select-next-email.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/IBM_Verse_-_Auto-Select_Next_Email
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/IBM_Verse_-_Auto-Select_Next_Email/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/IBM_Verse_-_Auto-Select_Next_Email.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/IBM_Verse_-_Auto-Select_Next_Email.user.js

// @include      https://mail.notes.na.collabserv.com/verse*
// @require      https://gist.githubusercontent.com/raw/b19c33e4b2cec8861d55df10be0ce162/
// ==/UserScript==
/* global onElementReady */

/**
 * add features to comments
 *
 * @param {HTMLElement} button - triple dot more button under comments
 */
function f(button) {
  const selectedEmail =
    button.parentElement.parentElement.parentElement.parentElement

  button.addEventListener("click", () => {
    let nextEmail

    // is last email
    if (selectedEmail.nextElementSibling.tagName === "SPAN") {
      nextEmail =
        selectedEmail.previousElementSibling.attributes["aria-labelledby"].value
    } else {
      nextEmail =
        selectedEmail.nextElementSibling.attributes["aria-labelledby"].value
    }

    /** @type {HTMLElement} */
    const item = document.querySelector(`[aria-labelledby="${nextEmail}"]`)
    if (item) item.click()
  })
}

window.addEventListener(
  "load",
  () => {
    onElementReady("button.triage-action.remove", {}, f)
  },
  false
)
