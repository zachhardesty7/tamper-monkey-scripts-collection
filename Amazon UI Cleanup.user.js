/* eslint-env browser, jquery, greasemonkey */

// ==UserScript==
// @name        Amazon UI Cleanup
// @namespace   https://zachhardesty.com/
// @description removes annoying largely not useful elements from Amazon
// @include     https://*amazon.com*
// @version     0.0.0
// ==/UserScript==

(function f() {
  // create functions to add null checking and prevent script errors
  const getEl = (target, i = 0) => (
    typeof (target) === 'string'
      ? document.querySelectorAll(target) && document.querySelectorAll(target)[i]
      : typeof (target) === 'object' && target
  )

  const getElAll = target => (
    typeof (target) === 'string'
      ? Array.from(document.querySelectorAll(target))
      : typeof (target) === 'object' && Array.from(target)
  )

  const on = (target, event, func) => {
    const el = getEl(target)
    if (el && el.addEventListener) el.addEventListener(event, func)
  }

  const setAttr = (target, attr, val, i = 0) => {
    const el = getEl(target, i)
    if (el) el[attr] = val
  }

  const hide = (target, i = 0) => {
    setAttr(target, 'style', 'display: none', i)
  }

  const setStyle = (target, val, i = 0) => {
    setAttr(target, 'style', val, i)
  }

  const hideParentX = (target, x = 0, i = 0) => {
    let el = getEl(target, i)

    for (let count = 0; count < x; count += 1) {
      el = el && el.parentElement
    }

    setAttr(el, 'style', 'display: none')
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
    // getEl('.a-column.a-span6.a-span-last').lastElementChild.style = 'display: none'

    // misc ads -- does not prevent loading or tracking
    hide('#amsDetailRight_feature_div')
    hide('#dp-ads-center-promo_feature_div')
    hide('#ape_Detail_dp-ads-center-promo_Desktop_placement')
    hide('#ADPlaceholder')
    hide('#ape_Detail_ad-endcap-1_Glance_placement')

    // clean up empty section dividers
    getElAll('.bucket').forEach((divider) => {
      setStyle(divider, 'display: block')
    })
    getElAll('.bucketDivider').forEach(hide)
    hideParentX('#promoGrid', 4)
    hide('#messages')

    // hide related products and recommendations
    getElAll('.a-section.similarities-widget').forEach((widget) => {
      hideParentX(widget, 1)
    })
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
