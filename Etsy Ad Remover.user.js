/* eslint-env browser, jquery, greasemonkey */
/* eslint-disable max-len */
/* global waitForKeyElements */

// ==UserScript==
// @name        Etsy Ad Remover
// @namespace   https://zachhardesty.com/
// @description removes annoying and inconspicuous search ads from Etsy
// @include     https://www.etsy.com/search*
// @include     https://www.etsy.com/market/*
// @version     1.0.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function actionFunction(jNode) {
  jNode
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .remove()
}

waitForKeyElements('.ad-indicator', actionFunction)
