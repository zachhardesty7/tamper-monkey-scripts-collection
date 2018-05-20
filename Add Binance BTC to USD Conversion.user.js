// ==UserScript==
// @name         Add Binance BTC to USD Conversion
// @namespace    http://zachhardesty.com
// @version      1.2
// @description  adds a quick and rough conversion to get value of coin in USD on "balance" page, "deposits & withdrawals" page, and on "basic exchange" page
// @author       Zach Hardesty
// @match        https://www.binance.com/userCenter/balances.html
// @match        https://www.binance.com/userCenter/depositWithdraw.html
// @match        https://www.binance.com/trade.html*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

// TODO: refactor to eliminate unnecessary library - waitForKeyElements

// @args None
function main () {
  // active ticker
  if (window.location.href.includes('https://www.binance.com/trade.html')) {
    const pageTicker = document.querySelector('.productSymbol').firstElementChild.textContent

    fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,BNB,' + pageTicker + '&tsyms=USD')
    .then(resp => resp.json())
    .then(function (data) {
      GM_setValue('BTCUSD', data.BTC.USD)
      GM_setValue('ETHUSD', data.ETH.USD)
      GM_setValue('BNBUSD', data.BNB.USD)
      GM_setValue(pageTicker + 'USD', data[pageTicker].USD)

      // either add USD to basic exchange or to balance pages
      waitForKeyElements('input.ng-pristine.ng-valid', addTickerConversionRate)
    })

    .catch(function (error) {
      console.log(error)
    })
  } else {
    fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(resp => resp.json())
    .then(function (data) {
      GM_setValue('BTCUSD', data.BTC.USD)
      // if elem are loaded then add USD value below BTC val
      waitForKeyElements('.td.ng-scope', addBTCConversionRate)
     })

    .catch(function (error) {
      console.log(error)
    })
  }
}

// runs on the addition of each ticker
// adds rough dollar conversion using stored global data below BTC value
// @args jNode node of most recently added ticker
function addBTCConversionRate (jNode) {
  let BTCUSD = GM_getValue('BTCUSD')
  let BTCElement = jNode[0].firstElementChild.children[5]
  if (BTCElement.textContent !== 0) {
    // convert to pretty USD format
    let USDVal = (BTCElement.textContent * BTCUSD).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    let USDValElem = document.createElement('p')
    USDValElem.textContent = '≈ ' + USDVal + ' USD'
    USDValElem.style = 'color: #A0A0A0'
    BTCElement.append(USDValElem)
  }
}

// TODO: remove, totally unnecessary
// runs on the addition of each ticker
// adds rough dollar conversion using stored global data below BTC value
// @args jNode node of most recently added ticker
function addTickerConversionRate (jNode) {
  const n = jNode[0]

  // market and stop-limit orders
  if (n.id.includes('total') || n.id.includes('market')) {
    n.changeValueDetection() // init observer
    n.addEventListener('changeValueDetection', updateTickerConversionRate)
  }
}

function updateTickerConversionRate () {
  // remove old value
  if (this.parentElement.parentElement.children.length > 2) this.parentElement.parentElement.children[2].remove()

  const ticker = this.parentElement.lastElementChild.textContent
  const tickerUSD = GM_getValue(ticker + 'USD')

  // convert to pretty USD format
  let USDVal = (this.value * tickerUSD).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  let USDValElem = document.createElement('p')
  USDValElem.textContent = '≈ ' + USDVal + ' USD'
  USDValElem.style = 'color: #ccc; text-align: right; font-size: 12px; background-color: white; border: #ccc 1px solid; border-top: hidden; padding: 3px 5px 2px 5px; float: right; margin-right: 6px'
  this.parentElement.parentElement.append(USDValElem)
}

// comprehensive check for value change FOR ANY REASON (Angular, js, etc)
// credit - https://gist.github.com/inter-coder/d674758f727fa866f9e9
HTMLElement.prototype.changeValueDetection = function () {
  var element = this
  var oldVal = element.value
  var GUID = function () { var S4 = function () { return (Math.floor(Math.random() * 0x10000).toString(16)) }; return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()) }
  var uiq = 'GUID-' + GUID()
  if (window.changeValueDetectionEvents === undefined)window.changeValueDetectionEvents = new Event('changeValueDetection')
  element.setAttribute('data-uiq', uiq)
  window[uiq] = setInterval(function () {
    if (element.value !== oldVal) {
      oldVal = element.value; element.setAttribute('value', oldVal)
      element.dispatchEvent(window.changeValueDetectionEvents)
    }
    if (document.querySelectorAll("[data-uiq='" + uiq + "']").length === 0) { // clear interval, if element no exist
      clearInterval(window[uiq])
    };
  }, 100)
};

// execute script
(function () {
  $(document).ready(main)
})()
