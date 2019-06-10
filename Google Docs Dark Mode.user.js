/* global googleDocsUtil */

// ==UserScript==
// @name         Google Docs Dark Mode (CURRENTLY SUCKS, GIANT BETA)
// @namespace    https://zachhardesty.com
// @version      0.0.0
// @description  best dark mode out there!
// @author       Zach Hardesty
// @match        https://docs.google.com/document/*
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// @grant        none
// ==/UserScript==

// strikingly complex (uses DOM bounding boxes) to get currently selected text:
// may implement only necessary functions to save space, library size: (15.4 KB)
// https://github.com/JensPLarsen/ChromeExtension-GoogleDocsUtil

// document.addEventListener('DOMContentLoaded', setDark, false)

// setInterval(setDark, 1000)

(function setDark() {
  console.log('darkening')
  document.querySelector('#kix-appview > div.kix-appview-editor-container > div > div:nth-child(1) > div.kix-zoomdocumentplugin-outer > div > div > div > div:nth-child(2) > div').style['background-color'] = 'rgb(26, 26, 26)'

  const css = `
html { background-color: rgb(26, 26, 26) !important; }
.kix-cursor-caret { border-color: white !important; }
body { background-color: rgb(26, 26, 26) !important; }
.kix-page.kix-page-paginated { background-color: rgb(26, 26, 26) !important; }
.kix-page-content-wrapper { background-color: rgb(26, 26, 26) !important; }
.docs-ui-unprintable { background-color: rgb(26, 26, 26) !important; }
.goog-inline-block.kix-lineview-text-block { color: rgb(191, 191, 191) !important; }
span .kix-wordhtmlgenerator-word-node { color: rgb(191, 191, 191) !important; }
.kix-wordhtmlgenerator-word-node { color: rgb(191, 191, 191) !important; }
    `
  const style = document.createElement('style')
  const head = document.head || document.getElementsByTagName('head')[0]

  style.id = 'dark' // to edit later
  style.type = 'text/css'
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
})()

function padZero(str, len) {
  len = len || 2
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  let r = parseInt(hex.slice(0, 2), 16)

  let g = parseInt(hex.slice(2, 4), 16)

  let b = parseInt(hex.slice(4, 6), 16)
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF'
  }
  // invert color components
  r = (255 - r).toString(16)
  g = (255 - g).toString(16)
  b = (255 - b).toString(16)
  // pad each with zeros and return
  return `#${padZero(r)}${padZero(g)}${padZero(b)}`
}
