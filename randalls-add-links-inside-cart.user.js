// ==UserScript==
// @name        Randall's - Add Links Inside Cart
// @namespace   https://zachhardesty.com/
// @description fixes lack of href tag on <a /> tag for products in cart
// @include     https://shop.randalls.com/ecom/modern1/my-cart*
// @version     1.0.0
// @require     https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// @license     GPL-3.0-only; https://www.gnu.org/licenses/gpl-3.0.en.html
// @copyright   2019, Zach Hardesty (https://zachhardesty.com/)
// ==/UserScript==

// IT'S SUCH BAD UX TO NOT INCLUDE AN
// HREF ON ALL <a /> TAGS

window.onElementReady('.cartdesc', false, (el) => {
	const link = el.querySelector('a')
	link.href = `http://shop.randalls.com${
		link.onclick.toString().match(/\/product-details\.\d+\.html/gm)
	}`
})
