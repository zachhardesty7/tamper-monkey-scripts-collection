// ==UserScript==
// @name         Piazza - Archive with Delete Key
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  bind the delete key to quickly archive posts
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/piazza-archive-with-delete-key.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Piazza_-_Archive_with_Delete_Key
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Piazza_-_Archive_with_Delete_Key/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Piazza_-_Archive_with_Delete_Key.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Piazza_-_Archive_with_Delete_Key.user.js

// @include      https://piazza.com/class/*
// ==/UserScript==

const delSelItem = (e) => {
	if (e.key === 'Delete') {
		const item = document.querySelector('.feed_item.selected')
		P.feed.delFeedItem(item.id);
	}
}

document.addEventListener('keydown', delSelItem)
