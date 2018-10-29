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
  const getEl = (selector, i = 0) => (
    document.querySelectorAll(selector) && document.querySelectorAll(selector)[i]
  )

  const on = (el, event, func) => {
    if (el) el.addEventListener(event, func)
  }

  const setAttr = (selector, attr, val, i = 0) => {
    const el = getEl(selector, i)
    if (el) el[attr] = val
  }

  const hide = (selector, i = 0) => {
    setAttr(selector, 'style', 'display: none', i)
  }

  const link = window.location.href

  if (link.match(/https*:\/\/.*?amazon\.com\/dp\/.*/g) || link.match(/https*:\/\/.*?amazon\.com\/gp\/product\/.*/g) || link.match(/https*:\/\/.*?amazon\.com\/.*\/dp\/.*/g)) {
    // hide nav junk / ads
    hide('#dp div', 0)
    hide('#dp div', 1)

    // hide sharing
    hide('#tellAFriendBox_feature_div')

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
    hide('#glowContextualIngressPt_feature_div')
    hide('#digitalDashLowProminence_feature_div')
    hide('#digitalDashLowProminenceAccordion_feature_div')
    hide('#digital-dash-create-high-prominence')
    hide('#buyNow')
    getEl('.a-column.a-span6.a-span-last').lastElementChild.style = 'display: none'

    // hide divider sections
    Array.from(document.querySelectorAll('.bucket')).forEach((divider) => {
      divider.style = 'display: block' // eslint-disable-line no-param-reassign
    })

    Array.from(document.querySelectorAll('.bucketDivider')).forEach((divider) => {
      divider.style = 'display: none' // eslint-disable-line no-param-reassign
    })

    // hide related products and recommendations
    hide('#sims-fbt')
    hide('#bundleV2_feature_div')
    hide('#p13n-m-desktop-dp-sims_session-similarities-sims-feature-3')
    hide('#p13n-m-desktop-dp-sims_purchase-similarities-sims-feature-3')
    hide('#p13n-m-desktop-dp-sims_purchase-similarities-sims-feature-2')
    hide('#rhf')
    hide('#sponsoredProducts2_feature_div')
    getEl('.a-section.similarities-widget', 1).parentElement.style = 'display: none'
    getEl('.a-section', document.querySelectorAll('.a-section').length - 5).style = 'display: none'

    // hide other junk sections
    hide('#sp_detail')
    hide('#quickPromoBucketContent')
    getEl('.a-section.askDetailPageSearchWidgetSection').parentElement.style = 'display: none'
    hide('#vse-related-videos')
    hide('.a-section.vse-empty-view-container.bucket')
    hide('#importantInformation')
    hide('#giveaway_feature_div')
    hide('#view_to_purchase-sims-feature')
    hide('#store-disclaimer_feature_div')
    setAttr('#aplus', 'style', 'padding: 15px 0; border-top: lightgrey 1px solid')
  }

  // wishlist page
  if (link.match(/https*:\/\/.*?amazon\.com\/hz\/wishlist\/ls.*/g)) {
    // hide recommendations
    hide('#rhf')
    hide('#loaded-items')

    // increase spacing of filter icon
    setAttr('#filter-and-sort span', 'style', 'padding-right: 5px')
  }

  // ideas page
  if (link.match(/https*:\/\/.*?amazon\.com\/ideas\/.*/g)) {
    // hide recommendations
    hide('#rhf')
  }

  /* site-wide modifications */
  // hide nav ads
  hide('#nav-upnav')
  hide('#nav-subnav')
  hide('#nav-belt .nav-right')

  // minimize size and hide useless giant footer section
  setAttr('#navFooter', 'style', 'margin-top: 0px')
  hide('.navFooterLine.navFooterLinkLine.navFooterPadItemLine')
  hide('.navFooterLine.navFooterLinkLine.navFooterDescLine')
  setAttr('#navFooter.navLeftFooter .navFooterCopyright', 'style', 'padding-bottom: 10px !important')

  // hide generally useless last remaining part of footer section
  hide('#navFooter .navFooterVerticalColumn.navAccessibility')
  setAttr('.nav-footer-line', 'style', 'margin-top: 0px')
  setAttr('#navBackToTop div', 'style', 'margin-bottom: 0px')

  // add button to allow display as normal
  setAttr('#navFooter .nav-footer-line', 'innerHTML', `
    <a
      id='view-footer'
      style='color: #fff; padding: 15px 0; display: block; text-align: center;'
    >
      View Footer Site Links
    </a>
  `)

  on(getEl('#view-footer'), 'click', () => {
    hide('#view-footer')
    setAttr('.nav-footer-line', 'style', 'margin-top: 30px')
    setAttr('#navBackToTop div', 'style', 'margin-bottom: 30px')
    setAttr('#navFooter .navFooterVerticalColumn.navAccessibility', 'style', 'display: table')
  })
})()
