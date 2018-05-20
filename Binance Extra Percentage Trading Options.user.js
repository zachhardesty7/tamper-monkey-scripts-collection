// ==UserScript==
// @name         Binance Extra Percentage Trading Options
// @namespace    http://zachhardesty.com
// @version      1.0
// @description  add more options to the simple market page (5%, 10%, 15%, 20%, 33%, 40%, 66%, 80%, 90%)
// @author       Zach Hardesty
// @match        https://www.binance.com/trade.htm*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// TODO: occasionally funky for using real after the new percs
// TODO: eliminate jQuery functions (other than ready)

// gogogo
function main () {
  // only opperate once all necessary elements have loaded
  waitForKeyElements('.orderforms-hd', addPercentages, true)
}

// finds possible amount able to buy
function getBalanceBuy () {
  return document.querySelectorAll('.orderforms-hd div .f-fr')[0]
    .textContent
    .match(/\d+\.\d+/g)[0] /
        document.querySelectorAll('#buyPrice')[0]
          .value
}

// finds quanitity able to sell
function getBalanceSell () {
  return document.querySelectorAll('.orderforms-hd div .f-fr')[1]
    .textContent
    .match(/\d+\.\d+/g)[0]
}

// runs on the addition of each ticker
// @args jNode node of most recently checked page
function addPercentages (jNode) {
  // new percentages
  const p = [0.05, 0.10, 0.15, 0.33, 0.40, 0.66, 0.80, 0.90]

  // grab all necessary elems from node
  const form = jNode.parent().children('form').children('.orderforms-inputs')
  const type = jNode.parent().children('form').attr('name')
  const pers = form.children('.field.percent').children('.iptwrap')

  // style new grid of percentages
  pers.parent().css({ 'margin-bottom': '15px', 'text-align': 'right' })
  pers.children().last().css({ 'margin-right': '8px' })

  // to keep in scope, init
  let quantity
  let total

  // limit order
  if (form.children().length === 4) {
    quantity = form.children(':nth-child(2)').children('.iptwrap').children('input')
    total = form.children(':nth-child(4)').children('.iptwrap').children('input')

    // market order
    // total auto calced at time of purchase
  } else if (form.children().length === 3) {
    quantity = form.children(':nth-child(2)').children('.iptwrap').children('input')

    // stop-limit order, limit should be filled in first
  } else {
    quantity = form.children(':nth-child(3)').children('.iptwrap').children('input')
    total = form.children(':nth-child(4)').children('.iptwrap').children('input')
  }

  // add all those new percentages
  for (const per of p) {
    // create and style button
    const button = document.createElement('span')
    button.className = 'col'
    button.textContent = (per * 100).toFixed(0) + '%'
    button.style = 'margin-bottom: 8px'

    pers.append(button)

    // handle updating fields when button clicked
    button.addEventListener('click', el => {
      // check if buy or sell order
      let balance
      type.includes('buy') ? balance = getBalanceBuy() : balance = getBalanceSell()

      // update quantity field
      const newQuantity = balance * per
      quantity.val(newQuantity)

      // handle field for total on limit and stop-limit orders
      if (form.children().length === 4) {
        total.val(form.children(':nth-child(1)').children('.iptwrap').children('input').val() *
                    newQuantity)
      } else if (form.children().length === 5) {
        total.val(form.children(':nth-child(2)').children('.iptwrap').children('input').val() *
                    newQuantity)
      }
    })
  }

  // gotta sort all those values
  var listitems = pers.children().get()
  listitems.sort(function (a, b) {
    a = parseInt($(a).text())
    b = parseInt($(b).text())

    return +a - +b
  })

  // and add them back to the nodelist
  $.each(listitems, function (_, item) {
    pers.append(item)
  })
}

(function () {
  main()
})()
