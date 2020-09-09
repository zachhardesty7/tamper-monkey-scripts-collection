// ==UserScript==
// @name         IBM Verse - Auto-Select Next Email
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  load up next email when the current one is deleted
// @copyright    2020, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/verse-ibm-select-next-email.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/IBM_Verse_-_Auto-Select_Next_Email
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/IBM_Verse_-_Auto-Select_Next_Email/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/IBM_Verse_-_Auto-Select_Next_Email.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/IBM_Verse_-_Auto-Select_Next_Email.user.js

// @include      https://mail.notes.na.collabserv.com/verse*
// @require      https://gist.githubusercontent.com/raw/b19c33e4b2cec8861d55df10be0ce162/
// ==/UserScript==
/* global onElementReady */

let nextEmailCon = null

window.addEventListener(
  "load",
  () => {
    // heading  buttons
    onElementReady("button.action.pim-delete.icon", {}, (button) => {
      // trigger on click heading del
      button.addEventListener(
        "click",
        () => {
          nextEmailCon.click()
        },
        { once: true }
      )
    })

    onElementReady("li.seq-msg-row", { findOnce: true }, (emailCon) => {
      const archiveButtonCon = emailCon.querySelector(
        "button.triage-action.remove"
      )

      // trigger on click inline archive
      archiveButtonCon.addEventListener(
        "click",
        () => {
          nextEmailCon.click()
        },
        { once: true }
      )

      // trigger on click inline delete
      archiveButtonCon.previousElementSibling.addEventListener(
        "click",
        () => {
          nextEmailCon.click()
        },
        { once: true }
      )

      emailCon.addEventListener("click", (e) => {
        const targetEl = /** @type {HTMLElement} */ (e.target)

        // trigger update
        if (targetEl.tagName !== "svg" && targetEl.tagName !== "rect") {
          nextEmailCon =
            emailCon.nextElementSibling &&
            emailCon.nextElementSibling.tagName === "SPAN"
              ? emailCon.previousElementSibling
              : emailCon.nextElementSibling
        }
      })
    })
  },
  false
)
