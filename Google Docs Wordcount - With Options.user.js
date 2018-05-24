// ==UserScript==
// @name         Google Docs Wordcount - With Options
// @namespace    http://zachhardesty.com
// @version      0.2
// @description  Adds a word counter with options to Google Docs
// @author       Zach Hardesty
// @match        https://docs.google.com/document/*
// @grant        none
// ==/UserScript==

// heavy inspiration from:
// https://greasyfork.org/en/scripts/22057-google-docs-wordcount/code
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
(function () {
  'use strict'
  // words not counted between these when true
  const BRACKETS = true
  const PARENTHESIS = true
  const QUOTES = true
  const MISC = true // skips works cited, personal titles

  let display = document.createElement('div')
  display.id = 'zh-display'
  display.style = `position: fixed; width: 100%; left: 0px; bottom: 0px; color: rgba(0,0,0,.7);
    height: 15px; background-color: #EDEDEE; z-index: 100; font-family: Arial;
    font-size: 12px; padding-top: 5px; padding-left: 5px; border-top: 1px solid #d9d9d9;`
  document.querySelector('body').append(display)

  async function setCount () {
    let pages = document.querySelector('.kix-paginateddocumentplugin').children[1].children
    let body = ''
    for (let page of pages) {
      let content = page.lastElementChild.firstElementChild
      let text = content.textContent
      if (text === '') {
        body += ' ~~ '
        /* gets stuck at bottom and won't load last page
        let bottoms = document.querySelectorAll('.kix-page-bottom')

        let elem = bottoms[bottoms.length - 1];
        elem.scrollIntoView()

        await sleep(5000)
        if (text !== '')
          document.querySelectorAll('.kix-page')[0].children[0].scrollIntoView()
        */
      }
      body += text
    }

    body = body.trim().replace(/\u00A0/g, ' ')

    // generate regex from settings
    // must escape \'s
    // all in regex form: /(“(.(?!“))+”)|(\((.(?!\())+\)|\[(.(?!\[))+\])|Works Cited(\n.*)*|(Unit \d (Primary Source Analysis|Exam: Part \d - #\d+))/g
    let regex = []
    if (BRACKETS) regex.push('\\[(.(?!\\[))+\\]')
    if (PARENTHESIS) regex.push('\\((.(?!\\())+\\)')
    if (QUOTES) regex.push('Works Cited(.|\\n.*)*|(Unit \\d (Primary Source Analysis|Exam: Part \\d( - #\\d+)*))')
    if (MISC) regex.push('(“(.(?!“))+”)')

    // apply regex filtering
    let filtered = body
    for (let filter of regex) {
      filtered = filtered.replace(new RegExp(filter, 'g'), ' ')
    }

    console.log(filtered)

    // remove extra spaces and line breaks and get counts
    let words = filtered.trim().replace(/\u00A0/g, ' ').replace(/ {2,}/g, ' ').split(' ')
    if (words.includes('~~')) {
      document.querySelector('#zh-display').textContent = 'Word Count: (scroll to bottom or remove empty page) | Pages: ' + pages.length
    } else {
      document.querySelector('#zh-display').textContent = 'Word Count: ' + words.length + ' | Pages: ' + pages.length
    }
  }

  /* unused currently
  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  } */

  setInterval(setCount, 1000)
})()
