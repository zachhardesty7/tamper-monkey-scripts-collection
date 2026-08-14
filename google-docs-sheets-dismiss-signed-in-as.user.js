// ==UserScript==
// @name         Google Docs & Sheets - Dismiss "signed in as"
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  Dismiss the "You're currently signed in as ..." pop-up when signed into multiple Google accounts.
// @copyright    2026, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/google-docs-sheets-dismiss-signed-in-as.user.js
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/google-docs-sheets-dismiss-signed-in-as.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Google_Docs_&_Sheets_-_Dismiss_signed_in_as
// @homepage     https://openuserjs.org/scripts/zachhardesty7/Google_Docs_&_Sheets_-_Dismiss_signed_in_as
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Google_Docs_&_Sheets_-_Dismiss_signed_in_as.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/Google_Docs_&_Sheets_-_Dismiss_signed_in_as.user.js

// @match        https://docs.google.com/*
// @require      https://update.greasyfork.org/scripts/419640/1776135/onElementReady.js
// ==/UserScript==

/* global onElementReady */

onElementReady(
  ".docssharedActiveAccountSurfaceCard .javascriptMaterialdesignGm3WizButtonFilled-button",
  { findFirst: true },
  (ok) => {
    ok.click()
  },
)
