// ==UserScript==
// @name         Quick Google Docs Force Center
// @namespace    http://zachhardesty.com
// @version      0.1
// @description  Force center align on Google Docs
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
