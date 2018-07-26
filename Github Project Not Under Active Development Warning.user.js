// ==UserScript==
// @name         Github Project Not Under Active Development Warning
// @namespace    http://zachhardesty.com
// @version      0.1.0
// @description  display big banner if project's last commit over 6 months ago and giant banner if over 1 year ago
// @author       Zach Hardesty
// @match        https://github.com/*/*
// ==/UserScript==

/* eslint no-undef: "off" */

function main () {
  const date = new Date(document.querySelector('.repository-content .commit-tease').lastElementChild.lastElementChild.firstElementChild.attributes[0].textContent)
  const dif = (Date.now() - date) / 1000 / 60 / 60 / 24 // in days
  if (dif > 365) { renderWarning() } else if (dif > 182.5) { renderCaution() }
}

function displayMessage (elem) {
  document.querySelector('.repohead-details-container').insertAdjacentElement('afterend', elem)
}

function renderWarning () {
  const banner = document.createElement('div')
  banner.style = `
    background-color: red;
    height: 100px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 36px;`

  banner.textContent = "WARNING: repo hasn't received an update in 1+ year(s)"

  displayMessage(banner)
}

function renderCaution () {
  const banner = document.createElement('div')
  banner.style = `
    background-color: yellow;
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;`

  banner.textContent = "Caution: repo hasn't received an update in 6+ months"

  displayMessage(banner)
}

(function () {
  main()
})()
