// ==UserScript==
// @name         Etsy - Remove Ads
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  removes annoying and inconspicuous search ads from Etsy
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.1

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/etsy-remove-ads.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Etsy_-_Remove_Ads
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Etsy_-_Remove_Ads/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Etsy_-_Remove_Ads.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Etsy_-_Remove_Ads.user.js

// @include      https://www.etsy.com/search*
// @include      https://www.etsy.com/market/*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==
/* global onElementReady */

onElementReady(".ad-indicator", false, (el) => {
  el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
})
