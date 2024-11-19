// ==UserScript==
// @name         Swagbucks - sort gift cards by cashback
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  sorts all of the giftcard icons based on their cashback, highest first
// @copyright    2024, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/swagbucks-sort-gift-cards-by-cashback.user.js
// @homepage     https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/swagbucks-sort-gift-cards-by-cashback.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Swagbucks_-_sort_gift_cards_by_cashback
// @homepage     https://openuserjs.org/scripts/zachhardesty7/Swagbucks_-_sort_gift_cards_by_cashback
// @supportURL   https://github.com/zachhardesty7/tamper-monkey-scripts-collection/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Swagbucks_-_sort_gift_cards_by_cashback.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/zachhardesty7/Swagbucks_-_sort_gift_cards_by_cashback.user.js

// @match        https://www.swagbucks.com/mygiftcardsplus
// ==/UserScript==

const CASHBACK_SELECTOR = ".giftCardCashback [data-var='num']"
async function main() {
  const container = document.querySelector("#myGiftCardsPlusCardsContainer")

  if (!container) {
    console.warn("#myGiftCardsPlusCardsContainer container not found")
    return
  }

  const cards = [...container.children]

  cards.sort((a, b) => {
    const aCashback = a.querySelector(CASHBACK_SELECTOR)?.textContent
    const bCashback = b.querySelector(CASHBACK_SELECTOR)?.textContent

    const aCashbackNum = aCashback ? Number.parseFloat(aCashback) : 0
    const bCashbackNum = bCashback ? Number.parseFloat(bCashback) : 0

    return bCashbackNum - aCashbackNum
  })

  // doesn't duplicate, just moves, see https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild#description
  container.append(...cards)
}

main()
