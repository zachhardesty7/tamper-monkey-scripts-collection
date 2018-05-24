// ==UserScript==
// @name         Google Docs Wordcount - With Options
// @version      0.1
// @description  Adds a word counter with options to Google Docs
// @author       Zach Hardesty
// @match        https://docs.google.com/document/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

// heavy inspiration from:
// https://greasyfork.org/en/scripts/22057-google-docs-wordcount/code
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
(function () {
  'use strict'
  let display = document.createElement('div')
  display.id = 'display'
  display.style = 'position: fixed; width: 100%; left: 0px; bottom: 0px; height: 15px; background-color: #dcdcdc; z-index: 100; font-family: Arial; font-size: 12px; padding-top: 5px; padding-left: 5px; border-top: 1px solid #cccccc;'
  document.querySelector('body').append(display)

  async function setCount () {
    let pages = document.querySelector('.kix-paginateddocumentplugin').children[1].children
    let body = ''
    for (let page of pages) {
      let content = page.lastElementChild.firstElementChild
      let text = content.textContent
      /* // gets stuck at bottom and won't load last page
            if (text === '') {
              let bottoms = document.querySelectorAll('.kix-page-bottom')

              let elem = bottoms[bottoms.length - 1];
              elem.scrollIntoView()

              await sleep(5000)
              if (text !== '')
                document.querySelectorAll('.kix-page')[0].children[0].scrollIntoView()
            }
      */
      body += text
    }

    let trimmed = body.replace(/(“(.(?!“))+”)|(\((.(?!\())+\)|\[(.(?!\[))+\])|Works Cited(\n.*)*|(Unit \d (Primary Source Analysis|Exam: Part \d - #\d+))/g)
      .trim().replace(/\u00A0/g, ' ') // remove extra spaces and line breaks
    let words = trimmed.split(' ')
    document.querySelector('#display').textContent = 'Word Count: ' + words.length + ' | Pages: ' + pages.length
  }

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  $(document).ready(setCount)
  setInterval(setCount, 1000)
})()
