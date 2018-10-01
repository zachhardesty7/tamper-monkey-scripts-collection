/* eslint-disable no-undef, no-console, max-len */

// ==UserScript==
// @name         Binance Extra Percentage Trading Options
// @namespace    http://zachhardesty.com
// @version      1.0
// @description  add more options to the simple market page (5%, 10%, 15%, 20%, 33%, 40%, 66%, 80%, 90%)
// @author       Zach Hardesty
// @match        https://www.binance.com/trade.htm*
// @match        https://www.binance.com/*/trade/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// TODO: occasionally funky for using real per after adding the new per
// TODO: eliminate jQuery functions (other than ready)

const formSelector = `#__next > div > main > div:nth-child(3) > div >
                      div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)
                      > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)`

// only operate once all necessary elements have loaded
// brittle but necessary selector (thanks binance for removing readable class names)
waitForKeyElements(formSelector, addPercentages, true)

// finds possible amount able to buy
function getBalanceBuy() {
  return document.querySelectorAll(`${formSelector}div:nth-child(1) > form > div:nth-child(3) > div > input`)[0]
    .textContent
    .match(/\d+\.\d+/g)[0] /
    document.querySelectorAll('#__next > div > main > div:nth-child(3) > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)')[0]
      .value
}

// finds quantity able to sell
function getBalanceSell() {
  return document.querySelectorAll('#__next > div > main > div:nth-child(3) > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > form > div:nth-child(1) > div > div')[1]
    .textContent
    .match(/\d+\.\d+/g)[0]
}

// @args jNode node of most recently checked page
function addPercentages(jNode) {
  // new percentages
  const p = [0.05, 0.10, 0.15, 0.33, 0.40, 0.66, 0.80, 0.90]

  // grab all necessary elems from node
  // form = jNode.children(':nth-child(1)').children('form')
  const form = jNode.children(':nth-child(1)').children('form')

  // everything below here isn't right anymore

  const type = jNode.parent().children('form').attr('name')
  const percents = form.children('.field.percent').children('.iptwrap')

  // style new grid of percentages
  percents.parent().css({ 'margin-bottom': '15px', 'text-align': 'right' })
  percents.children().last().css({ 'margin-right': '8px' })

  // to keep in scope, init
  let quantity
  let total

  // limit order
  if (form.children().length === 4) {
    quantity = form.children(':nth-child(2)').children('.iptwrap').children('input')
    total = form.children(':nth-child(4)').children('.iptwrap').children('input')

    // market order
    // total auto-calc at time of purchase
  } else if (form.children().length === 3) {
    quantity = form.children(':nth-child(2)').children('.iptwrap').children('input')

    // stop-limit order, limit should be filled in first
  } else {
    quantity = form.children(':nth-child(3)').children('.iptwrap').children('input')
    total = form.children(':nth-child(4)').children('.iptwrap').children('input')
  }

  // add all those new percentages
  p.forEach((percent) => {
    // create and style button
    const button = document.createElement('span')
    button.className = 'col'
    button.textContent = `${(percent * 100).toFixed(0)}%`
    button.style = 'margin-bottom: 8px'

    percents.append(button)

    // handle updating fields when button clicked
    button.addEventListener('click', (el) => {
      // check if buy or sell order
      let balance
      type.includes('buy') ? balance = getBalanceBuy() : balance = getBalanceSell()

      // update quantity field
      const newQuantity = balance * per
      quantity.val(newQuantity)

      // handle field for total on limit and stop-limit orders
      if (form.children().length === 4) {
        total.val(form.children(':nth-child(1)').children('.iptwrap').children('input').val() * newQuantity)
      } else if (form.children().length === 5) {
        total.val(form.children(':nth-child(2)').children('.iptwrap').children('input').val() * newQuantity)
      }
    })
  })

  // gotta sort all those values
  const listItems = percents.children().get()
  listItems.sort((a, b) => {
    textA = parseInt($(a).text(), 10)
    textB = parseInt($(b).text(), 10)

    return +a - +b
  })

  // and add them back to the nodeList
  $.each(listItems, (_, item) => {
    percents.append(item)
  })
}
