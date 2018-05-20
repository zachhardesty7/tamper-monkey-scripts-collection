// ==UserScript==
// @name         Binance Portfolio Distribution Pie Chart
// @namespace    http://zachhardesty.com
// @version      1.0
// @description  adds a quick display for visual representation of portfolio distribution breakdown (USD) on "balance" page and "deposits & withdrawals" page
// @author       Zach Hardesty
// @match        https://www.binance.com/userCenter/balances.html
// @match        https://www.binance.com/userCenter/depositWithdraw.html
// @require      https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js
// ==/UserScript==

/* eslint no-undef: "off" */

// runs on page load
// gets rough dollar conversion using api data and generates pie chart
// @args None
function main () {
  // stored data for colors
  const colors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    grey: 'rgb(201, 203, 207)',
    purple: 'rgb(153, 102, 255)',
    teal: '#59D2FE'
  }

  // stored data for chart
  let chartConfig = {
    type: 'pie',
    data: {
      datasets: [{
        data: [],
        backgroundColor: [],
        label: 'Dataset 1'
      }],
      labels: []
    },
    options: {
      responsive: false,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 20
        }
      },
      title: {
        display: true,
        text: 'Portfolio Distribution'
      }
    }
  }

  // begin program on page load finish
  window.onload = function () {
    // build canvas element
    let page = document.querySelector('.chargeWithdraw-title')
    let canvas = document.createElement('canvas')
    canvas.id = 'zhchart'
    canvas.height = 250
    canvas.width = 250
    canvas.style = 'height: 250px; width: 250px; display: block; float: right'

    // insert canvas and capture elem
    page.appendChild(canvas)
    var ctx = document.querySelector('#zhchart').getContext('2d')

    // scrape value of portfolio data in BTC
    let data = document.querySelectorAll('.td.ng-scope')
    let portfolio = {}
    data.forEach(elem => {
      let name = elem.firstElementChild.children[0].textContent
      let val = elem.firstElementChild.children[5].firstChild.textContent
      if (val !== 0) {
        portfolio[name] = val
      }
    })

    // get cur BTC to USD conversion rate
    fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        // capture 6 largest assests for pie chart
        for (let i = 0; i < 6; i++) {
          let maxName = getMaxInObject(portfolio)
          let maxVal = (parseFloat(portfolio[maxName]) * data.USD).toFixed(2)
          chartConfig.data.datasets[0].data.push(maxVal)
          chartConfig.data.labels.push(maxName)
          delete portfolio[maxName]
        }

        // accumulate remaining assests for "other" category of pie chart
        let otherCryptosVal = 0
        for (let ticker in portfolio) {
          otherCryptosVal += parseFloat(portfolio[ticker])
        }

        // update chart data with other category
        chartConfig.data.datasets[0].data.push((otherCryptosVal * data.USD).toFixed(2))
        chartConfig.data.labels.push('other')

        // randomize color order and update config
        let keys = Object.keys(colors)
        keys.sort(function () { return Math.random() - 0.5 })
        for (let i = 0; i < chartConfig.data.datasets[0].data.length; i++) {
          chartConfig.data.datasets[0].backgroundColor.push(keys[i])
        }

        // generate pie chart
        window.myPie = new Chart(ctx, chartConfig)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

// finds max val in object
// @returns matching key
function getMaxInObject (obj) {
  let maxKey = ''
  let maxVal = 0
  for (let key in obj) {
    if (obj[key] > maxVal) {
      maxVal = obj[key]
      maxKey = key
    }
  }
  return maxKey
}

// execute main program
(function () {
  main()
})()
