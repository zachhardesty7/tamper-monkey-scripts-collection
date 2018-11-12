/* eslint-env browser, jquery, greasemonkey */
/* eslint-disable max-len */
/* global waitForKeyElements */

// ==UserScript==
// @name         Add Binance BTC to USD Conversion
// @namespace    http://zachhardesty.com
// @version      1.2
// @description  adds a quick and rough conversion to get value of coin in USD on "balance" page and on "deposits & withdrawals" page
// @author       Zach Hardesty
// @match        https://www.binance.com/userCenter/balances*
// @match        https://www.binance.com/userCenter/depositWithdraw*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

// TODO: refactor to eliminate unnecessary library - waitForKeyElements

// @args None
function convertBTCToUSD() {
  fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(resp => resp.json())
    .then((data) => {
      GM_setValue('BTCUSD', data.BTC.USD)
      // if elem are loaded then add USD value below BTC val
      waitForKeyElements('.td.ng-scope', addBTCConversionRate)
    })

    .catch((error) => {
      console.log(error)
    })
}

// runs on the addition of each ticker
// adds rough dollar conversion using stored global data below BTC value
// @args jNode node of most recently added ticker
function addBTCConversionRate(jNode) {
  const BTCUSD = GM_getValue('BTCUSD')
  const BTCElement = jNode[0].firstElementChild.children[5]

  if (BTCElement.textContent !== 0) {
    // convert to pretty USD format
    const USDVal = (BTCElement.textContent * BTCUSD).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    const USDValElem = document.createElement('p')

    USDValElem.textContent = `≈ ${USDVal} USD`
    USDValElem.style = 'color: #a0a0a0'
    BTCElement.append(USDValElem)
  }
}

$(document).ready(convertBTCToUSD)
