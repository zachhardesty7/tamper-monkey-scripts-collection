/* eslint-env browser, jquery, greasemonkey */
/* eslint-disable max-len, no-underscore-dangle */
/* global wrapObject getCanvasName */
/* cSpell: ignore cosk icloud */

// ==UserScript==
// @name         Apple iCloud Notes Dark Theme
// @namespace    http://zachhardesty.com
// @version      1.0.0
// @description  best dark mode out there!
// @author       Zach Hardesty
// @match        https://www.icloud.com/applications/notes*
// @require      https://robwu.nl/s/canvas-interceptor.js
// @grant        none
// ==/UserScript==

(function setDark() {
  const theme = {
    lighter: '#d7dae0',
    light: '#cccccc',
    dark: '#282c34',
    darker: 'rgb(33, 37, 43)',
    darkest: 'rgb(29, 31, 35)'
  }

  const css = `
    /* text */
    .password-title,
    .password-description,
    .password-text-field,
    .folder-label,
    .note-list-item-title,
    .note-list-item-summary div,
    .notes-document-editor-view div {
      color: ${theme.light} !important;
    }

    /* selected text */
    .list-item.is-selected .note-list-item-title,
    .list-item.is-selected .note-list-item-date,
    .list-item.is-selected .note-list-item-snippet {
      color: ${theme.lighter} !important;
    }

    /* header bar backgrounds */
    .bottom-toolbar-view,
    .notes-note-list-toolbar-view,
    .notes-list-toolbar,
    .notes-note-list-content-view,
    .notes-note-pad-toolbar-view > div {
      background-color: ${theme.darker} !important;
    }

    /* input field backgrounds */
    .notes-list-search-view,
    .password-text-field {
      background-color: ${theme.darkest} !important;
    }

    /* workspace background */
    .notes-document-view,
    .notes-folder-list-content-view {
      background-color: ${theme.dark} !important;
    }

    /* vertical dividers */
    .split-view-horizontal .split-resize-handle,
    .split-view-vertical .split-resize-handle {
      background-color: ${theme.darker} !important;
    }

    /* horizontal dividers */
    .notes-note-list-toolbar-view,
    .folder-panel-view .notes-list-toolbar,
    .notes-note-pad-toolbar-view {
      border-bottom: 1px solid ${theme.darker} !important;
    }

    /* iCloud logo to white */
    .cosk-icloud-logo > svg {
      fill: ${theme.lighter} !important;
    }

    /* TODO: remove the yellow accent or blend better with dark colors */
    /* selected note item
    .notes-list-focused .list-item.on-screen.is-selected.cw-selected {}
    */
  `

  // attach stylesheet to inner frame
  const style = document.createElement('style')
  const head = document.head || document.getElementsByTagName('head')[0]

  style.type = 'text/css'
  if (style.styleSheet) {
    // IE8 and below
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  head.appendChild(style)

  // remove default canvas prototype wrapping (used for debugging)
  CanvasRenderingContext2D.prototype.__proxyUnwrap()

  // iCloud notes uses canvas rendering for text content.
  // it's not possible to directly edit the color of text
  // (or anything else) that's already been drawn to a canvas -
  // what the user sees is only a pixel representation of text.

  // fortunately, targeting the canvas context is still possible.
  // by wrapping the canvas prototype, we can detect calls from the parent script.
  // we look for calls to 'ctx.fillText()' and intercept them to modify
  // the style of the text to match the dark theme before the text is painted.
  wrapObject(CanvasRenderingContext2D.prototype, [
    'canvas'
  ], getCanvasName, (instance, expr) => {
    if (expr.includes('fillText')) {
      instance.__proxyOriginal.fillStyle.set.call(instance, 'rgba(204, 204, 204, 1)')
    }
  })
})()
