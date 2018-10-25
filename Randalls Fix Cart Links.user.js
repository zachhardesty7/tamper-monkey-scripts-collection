/* eslint-env browser, jquery, greasemonkey */
/* eslint-disable max-len */
/* global waitForKeyElements */

// ==UserScript==
// @name        Randall's Fix Cart Links
// @namespace   https://zachhardesty.com/
// @description fixes lack of href tag on <a /> tag for products in cart
// @include     https://shop.randalls.com/ecom/modern1/my-cart
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// IT'S SUCH BAD UX TO NOT INCLUDE AN
// HREF ON ALL <a /> TAGS

function fixCart(jNode) {
  const elem = jNode[0].querySelector('a')
  elem.href = `http://shop.randalls.com${
    elem.onclick.toString().match(/\/product-details\.\d+\.html/gm)}`
}

waitForKeyElements('.cartdesc', fixCart)
