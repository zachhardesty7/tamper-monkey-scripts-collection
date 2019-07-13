/* eslint-disable max-len, no-underscore-dangle */
/* cSpell: ignore cosk icloud */

// ==UserScript==
// @name         iCloud Notes - Dark Theme (BROKEN)
// @namespace    https://zachhardesty.com
// @version      2.0.0
// @description  best dark mode out there!
// @author       Zach Hardesty
// @match        https://www.icloud.com/applications/notes*
// @grant        none
// ==/UserScript==

(function setDark() {
	const theme = {
		lighter: '#d7dae0',
		light: '#cccccc',
		medium: 'rgba(204, 204, 204, .5)', // same as light w 50% opacity
		dark: '#282c34',
		darker: 'rgb(33, 37, 43)',
		darkest: 'rgb(29, 31, 35)',
	}

	// simple surrounding UI
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

    /* header/footer bar backgrounds */
    .nav-bar,
    .bottom-toolbar-view,
    .notes-note-list-content-view {
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
    .nav-bar {
      border-bottom: 1px solid ${theme.darker} !important;
    }
    .bottom-toolbar-view {
      border-top: 2px solid ${theme.darker} !important;
    }

    /* scrolling (folder window) */
    .cw-scroll-indicator .cw-scroll-indicator-thumb {
      background-color: ${theme.medium} !important;
    }
    .cw-scroll-indicator.cw-scroll-indicator-enlarged .cw-scroll-indicator-thumb {
      background-color: ${theme.dark} !important;
    }
    .cw-scroll-indicator.cw-scroll-indicator-enlarged.vertical {
      border-left: none !important;
    }
    .cw-scroll-indicator.cw-scroll-indicator-enlarged {
      background-color: ${theme.medium} !important;
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
	style.appendChild(document.createTextNode(css))

	head.appendChild(style)
})()

// experimental modifying WebGL canvas
/*

function getPixels(ctx) {
  return ctx.readPixels
    ? getPixels3d(ctx)
    : getPixels2d(ctx)
}

function getPixels3d(gl) {
  var canvas = gl.canvas
  var height = canvas.height
  var width  = canvas.width
  var buffer = new Uint8Array(width * height * 4)

  gl.readPixels(0, 0
    , canvas.width
    , canvas.height
    , gl.RGBA
    , gl.UNSIGNED_BYTE
    , buffer
  )

  return buffer
}

function getPixels2d(ctx) {
  var canvas = ctx.canvas
  var height = canvas.height
  var width  = canvas.width

  return ctx.getImageData(0, 0, width, height).data
}

function webglToCanvas2d(webgl, canvas2D) {

  var outCanvas = canvas2D ? canvas2D.canvas || canvas2D : document.createElement('canvas');
  var outContext = outCanvas.getContext('2d');
  var outImageData;

  webgl = webgl instanceof WebGLRenderingContext ? webgl : webgl.getContext('webgl') || webgl.getContext('experimental-webgl');

  outCanvas.width = webgl.canvas.width;
  outCanvas.height = webgl.canvas.height;
  outImageData = outContext.getImageData(0, 0, outCanvas.width, outCanvas.height);

  outImageData.data.set(new Uint8ClampedArray(getPixels3d(webgl).buffer));
  outContext.putImageData(outImageData, 0, 0);
  outContext.translate(0, outCanvas.height);
  outContext.scale(1, -1);
  outContext.drawImage(outCanvas, 0, 0);
  outContext.setTransform(1, 0, 0, 1, 0, 0);

  return outCanvas;
};

function wait(el) {
    // el.getContext('webgl', {preserveDrawingBuffer: true})
    window.setTimeout(() => canvas(el), 8000, 'That was really slow!');
}

function canvas(el) {
  console.log('MADE IT INTO THE FUNCTION')
  if (!el.className) {

      const ctx = el.getContext('webgl', {preserveDrawingBuffer: true})
      const canvas2d = webglToCanvas2d(ctx);

      console.log(el.toDataURL())
      console.log({canvas2d})

      canvas2d.className = 'test'
      console.log(canvas2d.toDataURL())
      el.parentElement.append(canvas2d)
      el.remove()
  }
}

onElementReady('canvas:not([class])', false, wait)

HTMLCanvasElement.prototype.getContext = function(origFn) {
    return function(type, attributes) {
        if (type === 'webgl') {
            attributes = Object.assign({}, attributes, {
                preserveDrawingBuffer: true,
            });
        }
        return origFn.call(this, type, attributes);
    };
}(HTMLCanvasElement.prototype.getContext);
*/
