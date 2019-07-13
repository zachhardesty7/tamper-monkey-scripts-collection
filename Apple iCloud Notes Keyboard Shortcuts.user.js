/* eslint-env browser, jquery, greasemonkey */
/* eslint-disable max-len, no-underscore-dangle */
/* cSpell: ignore cosk topo */

// ==UserScript==
// @name         Apple iCloud Notes Dark Theme
// @namespace    https://zachhardesty.com
// @version      1.0.0
// @description  best dark mode out there!
// @author       Zach Hardesty
// @match        https://www.icloud.com/applications/notes*
// @require      https://robwu.nl/s/canvas-interceptor.js
// @grant        none
// ==/UserScript==

(function addShortcuts() {
	window.dispatchEvent(new MouseEvent('mouseup'))
})()

/*
 classes
 notes-paragraph-style paragraph-style-Title single-style-active cw-button

notes-paragraph-style paragraph-style-Heading single-style-active cw-button

notes-paragraph-style paragraph-style-Body single-style-active cw-button style-is-active

notes-paragraph-style paragraph-style-FixedWidth single-style-active cw-button

action:
"userSetParagraphStyle"

userSetParagraphStyle: function(e) {
            var t = this.get("editorViewController");
            t && (t.setParagraphStyleForSelection(e),
            this._hideModal(t))
        },

        setParagraphStyleForSelection: function(e) {
            this.undoCursorBehavior = x.a.CursorBehavior.select,
            this.willChangeInsertionAttributes();
            var t = this.getPath("selection.first")
              , n = this.getPath("selection.last");
            if (this._topoText.beginChanges(),
            !t.hasNext()) {
                var i = se.a.getTopoTextAttributesWithParagraphStyle(this.getInsertionAttributesForCursor(t), e)
                  , r = t.clone().retain();
                this.insertStringAtCursorWithAttributes("\n", r, i),
                r.release()
            }
            this.mapBlockAttributesBetweenCursors(t, n, function(t) {
                return se.a.getTopoTextAttributesWithParagraphStyle(t, e)
            }),
            this._insertionAttributesHint = null,
            this._lastDeletedAttributes = null,
            this._topoText.endChanges()
        },

        this._eventListeners

*/
