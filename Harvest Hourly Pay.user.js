// ==UserScript==
// @name         Harvest Hourly Pay
// @namespace    http://zachhardesty.com
// @version      1.0
// @description  Adds Total Money Made per Day and Week to Harvest (excl. taxes)
// @author       Zach Hardesty
// @match        https://*.harvestapp.com/*
// @grant        none
// @downloadURL  http://zachhardesty.com/userscripts/harvest-hourly-pay.user.js
// ==/UserScript==

(function () {
  'use strict'
  function addPay () {
    // ** hourly pay rate - replace this **
    let rate = 16
    function timeToDecimal (t) {
      t = t.split(':')
      return parseFloat(parseInt(t[0], 10) + parseInt(t[1], 10) / 60)
    }
    let hoursPerDay = document.querySelectorAll('.day-view-week-nav li a span')
    hoursPerDay.forEach(function (time) {
      if (!time.textContent.includes('$')) {
        time.textContent += ' | $' + Math.round(timeToDecimal(time.textContent) * rate)
      }
    })
    let hoursPerWeek = document.querySelector('#day-view-week-nav-total .test-week-total')
    if (!hoursPerWeek.textContent.includes('$')) { hoursPerWeek.textContent += ' | $' + Math.round(timeToDecimal(hoursPerWeek.textContent) * rate) }
  }
  var observeDOM = (function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver
    var eventListenerSupported = window.addEventListener

    return function (obj, callback) {
      if (MutationObserver) {
        // define a new observer
        var obs = new MutationObserver(function (mutations, observer) {
          if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) { callback() }
        })
        // have the observer observe foo for changes in children
        obs.observe(obj, { childList: true, subtree: true })
      } else if (eventListenerSupported) {
        obj.addEventListener('DOMNodeInserted', callback, false)
        obj.addEventListener('DOMNodeRemoved', callback, false)
      }
    }
  })()

  // Observe a specific DOM element for node changes:
  observeDOM(document.querySelector('.day-view-week-nav'), addPay)
  // Execute on page load
  addPay()
})()
