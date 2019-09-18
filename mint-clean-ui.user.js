// ==UserScript==
// @name         Mint - Remove Ads
// @namespace    https://openuserjs.org/users/zachhardesty7
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @description  removes annoying and inconspicuous search ads from Etsy
// @copyright    2019, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      1.0.0

// @homepageURL  https://github.com/zachhardesty7/tamper-monkey-scripts-collection/raw/master/mint-clean-ui.user.js
// @homepageURL  https://openuserjs.org/scripts/zachhardesty7/Mint_-_Remove_Ads
// @supportURL   https://openuserjs.org/scripts/zachhardesty7/Mint_-_Remove_Ads/issues

// @updateURL    https://openuserjs.org/meta/zachhardesty7/Mint_-_Remove_Ads.meta.js
// @downloadURL  https://openuserjs.org/install/zachhardesty7/Mint_-_Remove_Ads.user.js

// @include      https://mint.intuit.com*
// @exclude      https://mint.intuit.com/save.event
// @require      https://gist.githubusercontent.com/raw/ee7a6b80315148ad1fb6847e72a22313/
// ==/UserScript==
/* global onElementReady */

/* css hiding */
const main = () => {
	const styles = `
		/* feedback modal */
		.QSIPopOver.SI_6RSOI27plGNzMeV_PopOverContainer {
			display: none !important;
		}

		/* right help widget */
		.nr-side-widget {
			display: none !important;
		}

		.adviceWidget {
			display: none !important;
		}

		.feedbackWidget {
			display: none !important;
		}

		/* bills page feedback widget */
		.FeedbackView {
			display: none !important;
		}

		/* homepage ad */
		.promotions-personalized-offers-ui {
			display: none !important;
		}
	`

	const stylesheet = document.createElement('style')
	const head = document.head || document.getElementsByTagName('head')[0]
	stylesheet.type = 'text/css'
	stylesheet.appendChild(document.createTextNode(styles))
	head.appendChild(stylesheet)
}

/* dynamic hiding */
// hide account status bar (if robinhood text included)
onElementReady('.AccountStatusBarItemView .status.error', false,
	el => el.textContent.includes('Robinhood') &&
		document.querySelector('.AccountStatusBarView').remove())

main()
