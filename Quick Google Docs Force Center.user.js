// ==UserScript==
// @name         Google Docs Force Center
// @namespace    http://zachhardesty.com
// @version      1.0
// @description  force center align page content display on Google Docs, useful for smaller screens and laptops that accidentally scroll horizontally since you often don't need all of the margin on screen
// @author       Zach Hardesty
// @match        https://docs.google.com/document/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'
  document.querySelector('.kix-appview-editor').style = 'overflow-x: hidden'

  setInterval(() => {
    document.querySelector('.kix-appview-editor').scrollLeft =
      (document.querySelector('.kix-zoomdocumentplugin-outer').scrollWidth -
       document.querySelector('.kix-appview-editor').clientWidth) / 2
  }, 500)
})()
