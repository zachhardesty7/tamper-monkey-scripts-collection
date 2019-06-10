/* global onElementReady */

// ==UserScript==
// @name        Randall's Fix Cart Links
// @namespace   https://zachhardesty.com/
// @description fixes lack of href tag on <a /> tag for products in cart
// @include     https://shop.randalls.com/ecom/modern1/my-cart*
// @version     1.0.0
// @require     https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==

// IT'S SUCH BAD UX TO NOT INCLUDE AN
// HREF ON ALL <a /> TAGS

function fixCart(el) {
  const link = el.querySelector('a')
  link.href = `http://shop.randalls.com${
    link.onclick.toString().match(/\/product-details\.\d+\.html/gm)
  }`
}

onElementReady('.cartdesc', false, fixCart)
