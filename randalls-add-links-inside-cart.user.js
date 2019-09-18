// ==UserScript==
// @name         Randall's - Add Links Inside Cart
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  fixes lack of href tag on <a /> tag for products in cart
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/randalls-add-links-inside-cart.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Randalls_-_Add_Links_Inside_Cart
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Randalls_-_Add_Links_Inside_Cart/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Randalls_-_Add_Links_Inside_Cart.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Randalls_-_Add_Links_Inside_Cart.user.js

// @include      https://shop.randalls.com/ecom/modern1/my-cart*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==
/* global onElementReady */

// IT'S SUCH BAD UX TO NOT INCLUDE AN
// HREF ON ALL <a /> TAGS

onElementReady('.cartdesc', false, (el) => {
	const link = el.querySelector('a')
	link.href = `http://shop.randalls.com${
		link.onclick.toString().match(/\/product-details\.\d+\.html/gm)
	}`
})
