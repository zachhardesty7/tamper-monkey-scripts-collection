/* eslint-env browser, jquery, greasemonkey */

// ==UserScript==
// @name        Amazon UI Cleanup
// @namespace   https://zachhardesty.com/
// @description removes annoying largely not useful elements from Amazon
// @include     https://*amazon.com*
// @version     1.0.1
// ==/UserScript==

/**
 * @typedef {string | NodeListOf<Element> | Element | Element[] | null} DOMTargetItems
 * @typedef {string | Element | null} DOMTargetItem
 *
 */
(function f() {
	// create functions to add null checking and prevent script errors
	/**
  * retrieves node from selector or passes through el(s) or false otherwise,
  * designed to allow repeatedly calling on return value without breaking
  *
  * @param {DOMTargetItem} target - selector or el
  * @param {number} i - position of item to return if selector finds multiple matches
  * @returns {Element | object | boolean} targeted DOM el or input object or false otherwise
  */
	const getEl = (target, i = 0) => (
		typeof (target) === 'string'
			? document.querySelectorAll(target) && document.querySelectorAll(target)[i]
			: typeof (target) === 'object' && target
	)

	/**
  * retrieves nodes from selector or passes through el(s) or false otherwise,
  * designed to allow repeatedly calling on return value without breaking
  *
  * @param {DOMTargetItems} target - selector or els
  * @returns {Element | object | boolean} targeted DOM el or input object or false otherwise
  */
	const getElAll = target => (
		typeof (target) === 'string'
			? Array.from(document.querySelectorAll(target))
			: typeof (target) === 'object' && Array.from(target)
	)

	/**
  * adds an event listener func to a given selector (if it exists)
  *
  * @param {DOMTargetItem} target - selector or els
  * @param {Event} event - trigger to listen for
  * @param {Function} func - executed after event trigger
  * @returns {void}
  */
	const on = (target, event, func) => {
		const el = getEl(target)
		if (el && el.addEventListener) el.addEventListener(event, func)
	}

	/**
  * sets property on a given selector (if it exists)
  *
  * @param {DOMTargetItem} target - selector or el
  * @param {string} attr - trigger to listen for
  * @param {string} val - desired property value
  * @param {number} i - position of item to assign to if selector finds multiple matches
  * @returns {void}
  */
	const setAttr = (target, attr, val, i = 0) => {
		const el = getEl(target, i)
		if (el) el[attr] = val
	}

	/**
  * sets style on a given selector (if it exists), extends setAttr
  *
  * @param {DOMTargetItem} target - selector or el
  * @param {string} val - desired style property value
  * @param {number} i - position of item to assign to if selector finds multiple matches
  * @returns {void}
  */
	const setStyle = (target, val, i = 0) => {
		setAttr(target, 'style', val, i)
	}

	/**
  * sets style to 'display: none' on a given selector (if it exists), extends setStyle
  *
  * @param {DOMTargetItem} target - selector or el
  * @param {number} i - position of item to hide if selector finds multiple matches
  * @returns {void}
  */
	const hide = (target, i = 0) => {
		setStyle(target, 'display: none', i)
	}

	/**
  * sets style to 'display: none' on all results of a given selector (if they exist), extends hide
  *
  * @param {DOMTargetItem} target - selector or el
  * @returns {void}
  */
	const hideAll = (target) => {
		getElAll(target).forEach(hide)
	}

	/**
  * sets style to 'display: none' on a given selector's `X`
  * parent (if chain exists), extends setStyle
  *
  * @param {DOMTargetItem} target - selector or el
  * @param {number} x - vertical depth of item from parent to hide
  * @param {number} i - position of item to assign to if selector finds multiple matches
  * @returns {void}
  */
	const hideParentX = (target, x = 0, i = 0) => {
		let el = getEl(target, i)

		for (let count = 0; count < x; count += 1) {
			el = el && el.parentElement
		}

		setStyle(el, 'display: none')
	}

	const link = window.location.href

	if (link.match(/https*:\/\/.*?amazon\.com\/dp\/.*/g) || link.match(/https*:\/\/.*?amazon\.com\/gp\/product\/.*/g) || link.match(/https*:\/\/.*?amazon\.com\/.*\/dp\/.*/g)) {
		// hide nav junk / banner ads
		hide('#navSwmHoliday')
		hide('#universal-detail-ilm')
		hide('#detail-ilm_div')
		hide('#dp div', 0)
		hide('#dp div', 1)

		// hide sharing
		hide('#tellAFriendBox_feature_div')
		hide('#tellAFriendBylineBox_feature_div')

		// hide product sales help & options nobody uses (protection plan, etc)
		hide('#image-canvas-caption')
		hide('#issuancePriceblockAmabot_feature_div')
		hide('#alternativeOfferEligibilityMessaging_feature_div')
		hide('#productSupportAndReturnPolicy_feature_div')
		hide('#smileEligibility_feature_div')
		hide('#addServices_feature_div')
		hide('#edpIngress_feature_div')
		hide('#hqpWrapper')
		hide('#HLCXComparisonJumplink_feature_div')
		hide('#olp_feature_div')
		hide('#moreBuyingChoices_feature_div > div > .a-section.a-padding-base')
		hide('#hqp')
		hide('#mbb_feature_div')
		hide('#simpleBundle_feature_div')
		hide('#buyNow_feature_div')
		hide('#oneClick_feature_div')
		hideParentX('#oneClickSignIn', 1)
		hide('#glowContextualIngressPt_feature_div')
		hide('#digitalDashLowProminence_feature_div')
		hide('#digitalDashLowProminenceAccordion_feature_div')
		hide('#digital-dash-create-high-prominence')
		hide('#buyNow')
		hideParentX('#add-to-registry-wedding-button', 2)
		hideParentX('.oneclick-guide', 1)
		hideParentX('.oneclick-guide', 2, 1)
		hide('#tradeInInstantSavings_feature_div')
		hide('#digital-dash-create')
		hide('#tradeInButton_feature_div')
		hide('#add-to-baby-button-group')
		// getEl('.a-column.a-span6.a-span-last').lastElementChild.style = 'display: none'

		// misc ads -- does not prevent loading or tracking
		hide('#amsDetailRight_feature_div')
		hide('#dp-ads-center-promo_feature_div')
		hide('#ape_Detail_dp-ads-center-promo_Desktop_placement')
		hide('#ADPlaceholder')
		hide('#ape_Detail_ad-endcap-1_Glance_placement')
		hide('#productAlert_feature_div') // amazon hub

		// clean up empty section dividers
		getElAll('.bucket').forEach((divider) => {
			setStyle(divider, 'display: block')
		})
		hideAll('.bucketDivider')
		hide('#promoGrid')
		hide('#messages')

		// hide related products and recommendations
		hide('#skyCitySoftMerge_feature_div')
		hide('#recommendations_feature_div')
		hideAll('.a-section.similarities-widget')
		hide('[name="goKindleStaticPopDiv"]')
		hide('#sims-fbt')
		hide('#bundleV2_feature_div')
		hide('#cerberus_feature_div')
		hide('#p13n-m-desktop-dp-sims_session-similarities-sims-feature-3')
		hide('#p13n-m-desktop-dp-sims_purchase-similarities-sims-feature-3')
		hide('#p13n-m-desktop-dp-sims_purchase-similarities-sims-feature-2')
		hide('#relatedMaterials_feature_div')
		hide('#beautyRecommendations_feature_div')
		hide('#rhf')
		hide('#sponsoredProducts2_feature_div')
		hide('#sims-consolidated-2_feature_div')
		hide('#dpx-btf-hlcx-comparison_feature_div')
		hide('#HLCXComparisonWidget_feature_div')
		hide('#featureAwarenessWidget_feature_div')
		hideParentX('#widget_container .a-carousel-container', 1)
		hide('.a-section', getElAll('.a-section').length - 5)
		hide('#beautyBadging_feature_div') // Luxury Beauty green tag
		hide('#almMultiOfferEgress_feature_div') // "other ways to buy"
		hide('#ccxssContent') // post ATC recommendations panel
		// hide('#attach-accessories') // post ATC recommendations panel FIXME: broken due to lazy load
		// REVIEW: experimental, hide junk at the bottom of the page without ID or class
		hideAll('#dpx-giveaway_feature_div ~ div')
		hideAll('#dpx-giveaway_feature_div ~ table')

		// hide other junk sections
		hide('#sp_detail')
		hide('#quickPromoBucketContent')
		hideParentX('.a-section.askDetailPageSearchWidgetSection', 1)
		hide('#vse-related-videos')
		hide('.a-section.vse-empty-view-container.bucket')
		hide('#importantInformation')
		hide('#giveaway_feature_div')
		hide('#view_to_purchase-sims-feature')
		hide('#store-disclaimer_feature_div')
		hideParentX('#fiona-publisher-signup-link', 2)
		hideParentX('#hero-quick-promo', 1)
		hide('#extraProductInfoTxtBookFeatureGroup')
		setStyle('#aplus', 'padding: 15px 0; border-top: lightgrey 1px solid')
		setStyle('#reviewsMedley', 'margin-bottom: 0 !important')
		hide('#superleafProductAlert_feature_div')
		hide('#dpx-legal_feature_div')
		hide('#cm_cr_skyfall_medley.cr-skyfall-feedback-section')
		hide('#flipAndSampleAudio')
		hide('#authorFollow_feature_div')
		hide('.askQuestionExamples')
		hide('#acBadge_feature_div')
		hide('#hsxShCelDpAmznCertBdg') // works w alexa
		hide('#dpx-smarthome-hub_feature_div') // add alexa for voice control

		// remove unnatural black background of title bar on some pages (video game consoles)
		setStyle('#ppd-top', 'background: none')
		setStyle('#titleBar.superleaf', 'background: none')
		setStyle('.superleafParent #wayfinding-breadcrumbs_container', 'background: none')

		// fix colors
		getElAll('.superleafParent #wayfinding-breadcrumbs_feature_div .a-color-tertiary').forEach((breadcrumb) => {
			setStyle(breadcrumb, 'color: #111 !important')
		})
		setStyle('a#breadcrumb-back-link.a-link-normal.a-color-tertiary', 'color: #111 !important')
		setStyle('#superLeafTitleFeatureGroup #titleSection #title', 'color: black')
		setStyle('#titleBar.superleaf .a-color-secondary', 'color: #555 !important')
		setStyle('#titleBar-left', 'color: black')
		setStyle('#superLeafGameReviews_feature_div .a-icon-popover', 'filter: none')
		getElAll('#titleBar a:link, #titleBar.superleaf .a-link-normal').forEach((item) => {
			setStyle(item, 'color: #0066c0 !important')
		})
		setStyle('.superleaf .ac-for-text', 'color: #888')
		setStyle('#superleafActionPanelWrapper', 'box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 4px -1px')
	}

	// search page
	if (link.match(/https*:\/\/.*?amazon\.com\/s\/.*/g)) {
		Array.from(getElAll('.AdHolder')).forEach((ad) => {
			hide(ad) // sponsored listings
		})
		hide('#centerBelowExtra') // search feedback
	}

	// wishlist page
	if (link.match(/https*:\/\/.*?amazon\.com\/hz\/wishlist\/ls.*/g)) {
		// hide recommendations
		hide('#rhf')
		hide('#loaded-items')

		// increase spacing of filter icon
		setStyle('#filter-and-sort span', 'padding-right: 5px')
	}

	// ideas page
	if (link.match(/https*:\/\/.*?amazon\.com\/ideas\/.*/g)) {
		hide('#rhf') // hide recommendations
	}

	/* site-wide modifications */
	// hide nav ads
	hide('#nav-upnav')
	hide('#nav-subnav')
	hide('#nav-belt .nav-right')

	// hide recent items
	hide('#raw-sitewide-rhf')

	// minimize size and hide useless giant footer section
	setStyle('#navFooter', 'margin-top: 0px')
	hide('.navFooterLine.navFooterLinkLine.navFooterPadItemLine')
	hide('.navFooterLine.navFooterLinkLine.navFooterDescLine')
	setStyle('#navFooter.navLeftFooter .navFooterCopyright', 'padding-bottom: 10px !important')

	// hide generally useless last remaining part of footer section
	hide('#navFooter .navFooterVerticalColumn.navAccessibility')
	setStyle('.nav-footer-line', 'margin-top: 0px')
	setStyle('#navBackToTop div', 'margin-bottom: 0px')

	// add button to allow footer display restore
	setAttr('#navFooter .nav-footer-line', 'innerHTML', `
    <a
      id='view-footer'
      style='color: #fff; padding: 15px 0; display: block; text-align: center;'
    >
      View Footer Site Links
    </a>
  `)

	// activate button to restore footer display
	on(getEl('#view-footer'), 'click', () => {
		hide('#view-footer')
		setStyle('.nav-footer-line', 'margin-top: 30px')
		setStyle('#navBackToTop div', 'margin-bottom: 30px')
		setStyle('#navFooter .navFooterVerticalColumn.navAccessibility', 'display: table')
	})
})()
