// ==UserScript==
// @name         YouTube - Hide Non-search Results on Search Page
// @namespace    https://zachhardesty.com
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  hide videos with given title keywords
// @copyright    2024, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-hide-non-search-results.user.js
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/youtube-hide-non-search-results.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Hide_Non-search_Results_on_Search_Page
// @homepage     https://openuserjs.org/scripts/zachhardesty7/YouTube_-_Hide_Non-search_Results_on_Search_Page
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/YouTube_-_Hide_Non-search_Results_on_Search_Page.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/YouTube_-_Hide_Non-search_Results_on_Search_Page.user.js

// @match        https://www.youtube.com/results?search_query=*
// @icon         https://icons.duckduckgo.com/ip2/youtube.com.ico
// @grant        none
// ==/UserScript==

async function main() {
  // const nonSearchResultsSections = document.querySelectorAll('ytd-video-renderer ~ ytd-shelf-renderer')
  // more specific
  const nonSearchResultsSections = document.querySelectorAll(
    ".ytd-two-column-search-results-renderer ytd-video-renderer ~ ytd-shelf-renderer",
  )

  const nonSearchResultsChannels = document.querySelectorAll(
    ".ytd-two-column-search-results-renderer ytd-video-renderer ~ ytd-channel-renderer",
  )

  console.log("nonSearchResultsSections:", nonSearchResultsSections)
}

main()
